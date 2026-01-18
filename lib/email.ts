import { Resend } from 'resend';
import { prisma } from '@/lib/db';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generate cryptographically secure random token
 * @security Uses crypto.randomBytes for unpredictable tokens
 */
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Send email verification link
 * 
 * @security
 * - Token expires in 24 hours
 * - Stored in database for validation
 * - Single-use via database check
 */
export async function sendVerificationEmail(
  userId: string,
  email: string,
  name: string
) {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Store token in database
  await prisma.verificationToken.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  // SECURITY: Validate APP_URL to prevent phishing attacks
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  if (process.env.NODE_ENV === 'production' && !APP_URL.startsWith('https://')) {
    throw new Error('NEXT_PUBLIC_APP_URL must use HTTPS in production');
  }
  const verifyUrl = new URL(`/verify-email?token=${token}`, APP_URL).href;

  // ============================================================
  // DEV MODE BYPASS: Console.log verification link if no API key
  // ============================================================
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    // Development mode: Log link to terminal instead of sending email
    console.log('\n' + '='.repeat(80));
    console.log('🔗 [DEV MODE] EMAIL VERIFICATION LINK');
    console.log('='.repeat(80));
    console.log(`📧 To: ${email}`);
    console.log(`👤 Name: ${name}`);
    console.log(`🔗 Verification URL:\n\n   ${verifyUrl}\n`);
    console.log('⚠️  RESEND_API_KEY not configured - Email not sent');
    console.log('✅ Click the link above to verify your account');
    console.log('='.repeat(80) + '\n');

    return; // Exit early - don't attempt to send email
  }

  // Production mode: Send actual email via Resend
  try {
    await resend.emails.send({
      from: 'DiscoverUz <noreply@discoveruz.uz>',
      to: email,
      subject: 'Verify your email - DiscoverUz',
      html: `
        <div style="font-family: Inter, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1E3A8A 0%, #1e40af 100%); padding: 40px; border-radius: 16px;">
          <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #1E3A8A; margin: 0; font-size: 28px; font-weight: 800;">Welcome to DiscoverUz!</h1>
              <p style="color: #6B7280; margin: 8px 0 0 0; font-size: 14px;">Explore the Heart of Central Asia</p>
            </div>
            
            <p style="color: #374151; margin: 0 0 8px 0; font-size: 16px;">Hi ${name},</p>
            <p style="color: #374151; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
              Thank you for signing up! Please verify your email address by clicking the button below to activate your account.
            </p>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="${verifyUrl}" style="display: inline-block; background: linear-gradient(to right, #f2cc0d 0%, #d4b20b 100%); color: #1E3A8A; padding: 16px 32px; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(242, 204, 13, 0.4);">
                Verify Email Address
              </a>
            </div>
            
            <div style="background: #F3F4F6; padding: 16px; border-radius: 8px; margin-top: 24px;">
              <p style="color: #6B7280; font-size: 14px; margin: 0; line-height: 1.5;">
                <strong style="color: #374151;">Security Note:</strong> This verification link will expire in 24 hours. If you didn't create an account with DiscoverUz, please ignore this email.
              </p>
            </div>
            
            <div style="border-top: 1px solid #E5E7EB; margin-top: 32px; padding-top: 24px; text-align: center;">
              <p style="color: #9CA3AF; font-size: 13px; margin: 0;">
                © 2024 DiscoverUz. All rights reserved.<br/>
                Official National Tourism Platform of Uzbekistan
              </p>
            </div>
          </div>
        </div>
      `,
    });
    console.log(`✅ [Email] Verification email sent to ${email}`);
  } catch (error) {
    console.error('[Email] Failed to send verification email:', error);
    throw new Error('Failed to send verification email');
  }
}

/**
 * Send password reset link
 * 
 * @security
 * - Token expires in 1 hour (shorter for security)
 * - Single-use enforced via 'used' flag in database
 */
export async function sendPasswordResetEmail(
  userId: string,
  email: string,
  name: string
) {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

  // Create reset token
  await prisma.passwordResetToken.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  // SECURITY: Validate APP_URL to prevent phishing attacks
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
  if (!APP_URL) {
    throw new Error('NEXT_PUBLIC_APP_URL environment variable is required');
  }
  if (process.env.NODE_ENV === 'production' && !APP_URL.startsWith('https://')) {
    throw new Error('NEXT_PUBLIC_APP_URL must use HTTPS in production');
  }
  const resetUrl = new URL(`/auth/reset-password?token=${token}`, APP_URL).href;

  try {
    await resend.emails.send({
      from: 'DiscoverUz <noreply@discoveruz.uz>',
      to: email,
      subject: 'Reset your password - DiscoverUz',
      html: `
        <div style="font-family: Inter, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1E3A8A 0%, #1e40af 100%); padding: 40px; border-radius: 16px;">
          <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #1E3A8A; margin: 0; font-size: 28px; font-weight: 800;">Password Reset</h1>
              <p style="color: #6B7280; margin: 8px 0 0 0; font-size: 14px;">DiscoverUz Account Recovery</p>
            </div>
            
            <p style="color: #374151; margin: 0 0 8px 0; font-size: 16px;">Hi ${name},</p>
            <p style="color: #374151; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
              We received a request to reset your password. Click the button below to create a new password.
            </p>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(to right, #f2cc0d 0%, #d4b20b 100%); color: #1E3A8A; padding: 16px 32px; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(242, 204, 13, 0.4);">
                Reset Password
              </a>
            </div>
            
            <div style="background: linear-gradient(to right, #FEF3C7, #FED7AA); padding: 16px; border-radius: 8px; margin-top: 24px; border-left: 4px solid #f2cc0d;">
              <p style="color: #374151; font-size: 14px; margin: 0; line-height: 1.5;">
                <strong>⚠️ Security Alert:</strong> This link expires in 1 hour. If you didn't request a password reset, please ignore this email or contact support if you're concerned about your account security.
              </p>
            </div>
            
            <div style="border-top: 1px solid #E5E7EB; margin-top: 32px; padding-top: 24px; text-align: center;">
              <p style="color: #9CA3AF; font-size: 13px; margin: 0;">
                © 2024 DiscoverUz. All rights reserved.<br/>
                Official National Tourism Platform of Uzbekistan
              </p>
            </div>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error('[Email] Failed to send password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}
