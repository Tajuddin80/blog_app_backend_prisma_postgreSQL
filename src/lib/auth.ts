import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL || "http://localhost:3000"],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

      // Email HTML template
      const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7fa;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f7fa;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px 12px 0 0;">
                            <div style="width: 80px; height: 80px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Verify Your Email</h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 16px; color: #1a202c; font-size: 16px; line-height: 1.6;">
                                Hi <strong>${user.name || "there"}</strong>,
                            </p>
                            <p style="margin: 0 0 24px; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                Welcome to <strong>Prisma Blog App</strong>! We're excited to have you on board. To get started, please verify your email address by clicking the button below.
                            </p>

                            <!-- Verification Button -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="${verificationUrl}" style="display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                                            Verify Email Address
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Alternative Link -->
                            <div style="margin: 32px 0; padding: 20px; background-color: #f7fafc; border-radius: 8px; border-left: 4px solid #667eea;">
                                <p style="margin: 0 0 12px; color: #4a5568; font-size: 14px; font-weight: 600;">
                                    Button not working?
                                </p>
                                <p style="margin: 0; color: #718096; font-size: 14px; line-height: 1.5;">
                                    Copy and paste this link into your browser:
                                </p>
                                <p style="margin: 8px 0 0; word-break: break-all;">
                                    <a href="${verificationUrl}" style="color: #667eea; text-decoration: none; font-size: 13px;">
                                        ${verificationUrl}
                                    </a>
                                </p>
                            </div>

                            <!-- Security Notice -->
                            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
                                <p style="margin: 0 0 8px; color: #718096; font-size: 13px; line-height: 1.5;">
                                    <strong>🔒 Security tip:</strong> This link will expire in 24 hours for your security.
                                </p>
                                <p style="margin: 0; color: #718096; font-size: 13px; line-height: 1.5;">
                                    If you didn't create an account with Prisma Blog App, you can safely ignore this email.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 32px 40px; background-color: #f7fafc; border-radius: 0 0 12px 12px; text-align: center;">
                            <p style="margin: 0 0 12px; color: #4a5568; font-size: 14px;">
                                Need help? Contact us at 
                                <a href="mailto:support@prismablogapp.com" style="color: #667eea; text-decoration: none;">
                                    support@prismablogapp.com
                                </a>
                            </p>
                            <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                                © 2025 Prisma Blog App. All rights reserved.
                            </p>
                            <div style="margin-top: 16px;">
                                <a href="#" style="display: inline-block; margin: 0 8px; color: #a0aec0; text-decoration: none; font-size: 12px;">Privacy Policy</a>
                                <span style="color: #cbd5e0;">•</span>
                                <a href="#" style="display: inline-block; margin: 0 8px; color: #a0aec0; text-decoration: none; font-size: 12px;">Terms of Service</a>
                            </div>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
      `;

      // Plain text version as fallback
      const textVersion = `
Hi ${user.name || "there"},

Welcome to Prisma Blog App! We're excited to have you on board.

Please verify your email address by visiting this link:
${verificationUrl}

This link will expire in 24 hours for your security.

If you didn't create an account with Prisma Blog App, you can safely ignore this email.

Need help? Contact us at support@prismablogapp.com

© 2025 Prisma Blog App. All rights reserved.
      `;

      const info = await transporter.sendMail({
        from: '"Prisma Blog App" <prismablogapp@gmail.com>',
        to: user.email,
        subject: "🔐 Verify your email address - Prisma Blog App",
        text: textVersion,
        html: htmlTemplate,
      });

      console.log("Verification email sent:", info.messageId);
    },
  },
  rateLimit: {
    enabled: true,
    window: 10, // 10 seconds
    max: 100, // 100 requests per window
    storage: "memory", // or "database" for multi-server setups
  },
});
