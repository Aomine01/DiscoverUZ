/**
 * Contact Form Email Service
 * 
 * Sends email notifications for contact form submissions using Resend
 * 
 * SECURITY:
 * - Sanitized inputs (already validated by Zod)
 * - Rate limited by API route
 * - CSRF protected
 */

import { Resend } from 'resend';
import type { ContactFormData } from '@/lib/validations/inputs';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const FROM_EMAIL = 'DiscoverUz <onboarding@resend.dev>';
const TO_EMAIL = process.env.CONTACT_EMAIL || 'info@discoveruz.com';

/**
 * Send contact form notification email to the team
 */
export async function sendContactFormEmail(data: ContactFormData): Promise<void> {
    const { name, email, subject, message } = data;

    // Map subject codes to friendly names
    const subjectMap: Record<string, string> = {
        general: 'General Inquiry',
        booking: 'Booking Question',
        partnership: 'Partnership Opportunity',
        support: 'Technical Support',
        other: 'Other'
    };

    const friendlySubject = subjectMap[subject] || subject;

    try {
        await resend.emails.send({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            replyTo: email, // Allow direct reply to customer
            subject: `[Contact Form] ${friendlySubject} - ${name}`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1E3A8A 0%, #1e40af 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: #f2cc0d; margin: 0; font-size: 24px; font-weight: 800;">New Contact Form Submission</h1>
        <p style="color: #ffffff; margin: 8px 0 0 0; font-size: 14px;">DiscoverUz Tourism Platform</p>
    </div>

    <!-- Content -->
    <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <!-- Metadata -->
        <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: 600;">SUBMITTED:</td>
                    <td style="padding: 8px 0; color: #111827; font-size: 13px;">${new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Tashkent'
            })} (Tashkent Time)</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: 600;">CATEGORY:</td>
                    <td style="padding: 8px 0;">
                        <span style="background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">
                            ${friendlySubject}
                        </span>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Sender Info -->
        <div style="margin-bottom: 24px;">
            <h2 style="color: #1e40af; margin: 0 0 16px 0; font-size: 18px; font-weight: 700; border-bottom: 2px solid #f2cc0d; padding-bottom: 8px;">
                👤 Sender Information
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 80px;">Name:</td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
                    <td style="padding: 8px 0;">
                        <a href="mailto:${email}" style="color: #1e40af; text-decoration: none; font-weight: 600;">${email}</a>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Message -->
        <div style="margin-bottom: 24px;">
            <h2 style="color: #1e40af; margin: 0 0 16px 0; font-size: 18px; font-weight: 700; border-bottom: 2px solid #f2cc0d; padding-bottom: 8px;">
                💬 Message
            </h2>
            <div style="background: #f9fafb; border-left: 4px solid #f2cc0d; padding: 16px; border-radius: 4px;">
                <p style="margin: 0; color: #374151; font-size: 14px; white-space: pre-wrap;">${message}</p>
            </div>
        </div>

        <!-- Action Button -->
        <div style="text-align: center; margin-top: 32px;">
            <a href="mailto:${email}?subject=Re: ${friendlySubject}" 
               style="display: inline-block; background: linear-gradient(to right, #f2cc0d 0%, #d4b20b 100%); color: #1E3A8A; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 14px 0 rgba(242, 204, 13, 0.4);">
                📧 Reply to ${name}
            </a>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #e5e7eb; margin-top: 32px; padding-top: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                This email was sent from the DiscoverUz contact form.<br/>
                © ${new Date().getFullYear()} DiscoverUz. All rights reserved.<br/>
                Official National Tourism Platform of Uzbekistan
            </p>
        </div>
    </div>
</body>
</html>
            `,
            // Plain text fallback
            text: `
New Contact Form Submission - DiscoverUz

SUBMITTED: ${new Date().toLocaleString()}
CATEGORY: ${friendlySubject}

SENDER INFORMATION:
Name: ${name}
Email: ${email}

MESSAGE:
${message}

---
Reply to this email to respond directly to the sender.
            `.trim()
        });

        console.log('[Email] Contact form notification sent successfully', {
            to: TO_EMAIL,
            subject: friendlySubject,
            from: email
        });

    } catch (error) {
        console.error('[Email] Failed to send contact form notification:', error);
        throw new Error('Failed to send notification email');
    }
}
