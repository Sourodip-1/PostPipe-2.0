import { Resend } from 'resend';

// Initialize Resend with API Key from environment variables only if it exists
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`;

    if (!resend) {
        console.log(`[Email Simulation] Verification Email to: ${email}`);
        console.log(`[Email Simulation] Link: ${confirmLink}`);
        return { success: true, message: 'Email simulated' };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev', // Update this to your verified domain
            to: email,
            subject: 'Verify your email',
            html: `<p>Click <a href="${confirmLink}">here</a> to verify your email.</p>`,
        });

        if (error) {
            console.error('Error sending verification email:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Exception sending verification email:', error);
        return { success: false, error };
    }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

    if (!resend) {
        console.log(`[Email Simulation] Password Reset Email to: ${email}`);
        console.log(`[Email Simulation] Link: ${resetLink}`);
        return { success: true, message: 'Email simulated' };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev', // Update this to your verified domain
            to: email,
            subject: 'Reset your password',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        });

        if (error) {
            console.error('Error sending password reset email:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Exception sending password reset email:', error);
        return { success: false, error };
    }
};
