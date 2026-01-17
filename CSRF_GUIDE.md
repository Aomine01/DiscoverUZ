# CSRF Protection Implementation Guide

## 🔒 Overview

Your DiscoverUz application now has **production-grade CSRF protection** using the Double Submit Cookie pattern with HMAC-signed tokens.

## 🏗️ Architecture

### Security Strategy
- **Stateless**: No database lookups (fast, scalable)
- **HMAC-Signed Tokens**: Prevents token forgery
- **Double Submit**: Cookie + Header/Form must match
- **Fail-Secure**: Rejects requests by default if validation fails
- **Edge Runtime Compatible**: Uses Web Crypto API

### Components

1. **`lib/csrf.ts`** - Server-side token generation and validation
2. **`lib/csrf-client.tsx`** - Client-side utilities (hooks, components)
3. **`middleware.ts`** - Automatic token generation on page load
4. **`app/api/contact/route.ts`** - Example implementation

---

## 📋 How It Works

### 1. Token Generation (Middleware)
When a user first visits the site:
```typescript
// middleware.ts generates signed token
const csrfToken = await generateSignedCSRFToken();
// Format: "random_token.hmac_signature"

// Sets cookie (readable by client)
response.cookies.set("__csrf_token", csrfToken, {
    httpOnly: false, // Client needs access
    sameSite: "strict",
    maxAge: 86400 // 24 hours
});
```

### 2. Token Submission (Client)
For API calls:
```typescript
import { csrfFetch } from '@/lib/csrf-client';

const response = await csrfFetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data)
});
```

For Server Actions:
```tsx
import { CSRFTokenInput } from '@/lib/csrf-client';

<form action={serverAction}>
    <CSRFTokenInput />
    <input name="email" />
    <button>Submit</button>
</form>
```

### 3. Token Validation (Server)
```typescript
// API route
import { validateCSRFOrReject } from '@/lib/csrf';

export async function POST(req: Request) {
    const validation = await validateCSRFOrReject(req);
    if (!validation.valid) {
        return validation.error; // 403 Forbidden
    }
    // Process request...
}
```

---

## 🚀 Usage Examples

### Example 1: Protecting an API Route

```typescript
// app/api/my-endpoint/route.ts
import { validateCSRFOrReject } from '@/lib/csrf';

export async function POST(req: Request) {
    // CSRF protection
    const csrf = await validateCSRFOrReject(req);
    if (!csrf.valid) return csrf.error;

    // Your logic here
    const data = await req.json();
    // ...
}
```

### Example 2: Using csrfFetch in Client Component

```tsx
'use client';
import { csrfFetch } from '@/lib/csrf-client';

export default function ContactForm() {
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        const response = await csrfFetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Hello' })
        });
        
        if (response.ok) {
            alert('Success!');
        }
    }

    return <form onSubmit={handleSubmit}>...</form>;
}
```

### Example 3: Server Action with Hidden Input

```tsx
'use client';
import { CSRFTokenInput } from '@/lib/csrf-client';

export default function MyForm() {
    return (
        <form action={serverAction}>
            <CSRFTokenInput />
            <input name="username" />
            <button type="submit">Submit</button>
        </form>
    );
}
```

```typescript
// actions/my-action.ts
'use server';
import { NextRequest } from 'next/server';
import { validateCSRFToken } from '@/lib/csrf';

export async function serverAction(formData: FormData) {
    // Create mock request for validation
    const csrfToken = formData.get('csrf_token') as string;
    // Validate against cookie (implementation depends on your setup)
    
    // Your logic here
}
```

---

## ⚙️ Configuration

### Environment Variables
No additional configuration needed! CSRF uses existing `SESSION_SECRET`:

```bash
# .env
SESSION_SECRET="your-64-char-hex-string"
```

### Customize Cookie Settings

Edit `middleware.ts` to change token lifetime:

```typescript
response.cookies.set("__csrf_token", csrfToken, {
    httpOnly: false,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // Change this (currently 24 hours)
});
```

---

## 🧪 Testing

### Test Valid Request
```bash
# 1. Get token from cookie
curl -c cookies.txt http://localhost:3000

# 2. Extract token
TOKEN=$(cat cookies.txt | grep __csrf_token | cut -f7)

# 3. Make request with token
curl -b cookies.txt \
  -H "x-csrf-token: $TOKEN" \
  -X POST http://localhost:3000/api/contact \
  -d '{"email":"test@example.com"}'
```

### Test Invalid Request (should fail)
```bash
curl -X POST http://localhost:3000/api/contact \
  -d '{"email":"test@example.com"}'
# Expected: 403 Forbidden - "Invalid CSRF token"
```

---

## 🔍 Security Considerations

### ✅ Strengths
- **Stateless**: No database or Redis required
- **HMAC-Signed**: Tokens cannot be forged without SESSION_SECRET
- **Double Submit**: Even if attacker steals cookie, they can't include it in header
- **SameSite=Strict**: Cookie not sent on cross-origin requests
- **Edge Compatible**: Works with Vercel Edge Runtime

### ⚠️ Limitations
- **Subdomain Attacks**: If attacker controls subdomain, they can set cookies
  - **Mitigation**: Use specific domain in cookie settings
- **XSS Vulnerability**: If XSS exists, attacker can read cookie and token
  - **Mitigation**: Strict CSP (already implemented), input sanitization
- **Not for GET Requests**: Only protects mutations (POST/PUT/DELETE/PATCH)

---

## 🛠️ Troubleshooting

### Error: "CSRF token missing from cookie"
**Cause**: Middleware not running or cookies blocked  
**Fix**: Check middleware matcher in `middleware.ts`, ensure cookies enabled

### Error: "CSRF token mismatch"
**Cause**: Token in cookie doesn't match header  
**Fix**: Use `csrfFetch` or `CSRFTokenInput` to ensure tokens match

### Error: "CSRF token signature invalid"
**Cause**: TOKEN was tampered with or SESSION_SECRET changed  
**Fix**: Clear cookies and reload page to get new token

### Token expires too quickly
**Cause**: maxAge too short  
**Fix**: Increase maxAge in middleware (currently 24 hours)

---

## 📚 API Reference

### Server-Side (`lib/csrf.ts`)

#### `generateSignedCSRFToken(): Promise<string>`
Generates HMAC-signed token in format `token.signature`

#### `validateCSRFToken(request: NextRequest): Promise<void>`
Validates token from cookie matches header/form. Throws on failure.

#### `validateCSRFOrReject(request: NextRequest): Promise<{valid: true} | {valid: false, error: Response}>`
Helper for API routes. Returns error response on failure.

#### `requiresCSRFProtection(method: string): boolean`
Returns true for POST/PUT/DELETE/PATCH, false for GET/HEAD/OPTIONS

### Client-Side (`lib/csrf-client.tsx`)

#### `useCSRFToken(): string | null`
React hook to get current CSRF token from cookie

#### `csrfFetch(url: string, options: RequestInit): Promise<Response>`
Fetch wrapper that auto-includes CSRF token in header

#### `<CSRFTokenInput />`
Hidden input component for Server Actions

---

## ✅ Implementation Checklist

Your contact form API is already protected! For additional routes:

- [x] Core CSRF utilities created (`lib/csrf.ts`)
- [x] Client utilities created (`lib/csrf-client.tsx`)
- [x] Middleware updated to generate tokens
- [x] Contact API route protected
- [ ] Protect other API routes (if any)
- [ ] Update Server Actions to include CSRF validation
- [ ] Update client forms to use `csrfFetch` or `CSRFTokenInput`

---

**CSRF Protection Status: ✅ ACTIVE**
