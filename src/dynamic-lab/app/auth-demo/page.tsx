'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { signup, login, logout, forgotPassword, resendVerification, getSession } from '../../../../templates/auth/mongodb/actions';

const initialState = {
    message: '',
    success: false,
};

export default function AuthDemoPage() {
    const [signupState, signupAction] = useFormState(signup, initialState);
    const [loginState, loginAction] = useFormState(login, initialState);
    const [forgotPasswordState, forgotPasswordAction] = useFormState(forgotPassword, initialState);
    const [resendVerificationState, resendVerificationAction] = useFormState(resendVerification, initialState);
    const [logoutState, logoutAction] = useFormState(logout, initialState);

    const [session, setSession] = useState<any>(null);
    const [timeLeft, setTimeLeft] = useState<string>('');

    useEffect(() => {
        const checkSession = async () => {
            const sess = await getSession();
            setSession(sess);
        };

        checkSession();
        const interval = setInterval(checkSession, 5000); // Check every 5s
        return () => clearInterval(interval);
    }, [loginState, logoutState]); // Re-check on login/logout

    useEffect(() => {
        if (!session?.exp) {
            setTimeLeft('');
            return;
        }

        const timer = setInterval(() => {
            const now = Math.floor(Date.now() / 1000);
            const diff = session.exp - now;

            if (diff <= 0) {
                setTimeLeft('Expired');
                setSession(null);
            } else {
                const minutes = Math.floor(diff / 60);
                const seconds = diff % 60;
                setTimeLeft(`${minutes}m ${seconds}s`);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [session]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Auth Template Test Harness</h1>

            {/* Session Status Banner */}
            <div style={{
                padding: '15px',
                marginBottom: '20px',
                borderRadius: '8px',
                background: session ? '#e6fffa' : '#fff5f5',
                border: `1px solid ${session ? '#38b2ac' : '#fc8181'}`
            }}>
                <h3>Status: {session ? 'LOGGED IN' : 'NOT LOGGED IN'}</h3>
                {session && (
                    <div>
                        <p><strong>Email:</strong> {session.email}</p>
                        <p><strong>Session Expires In:</strong> {timeLeft}</p>
                    </div>
                )}
            </div>

            <div style={{ display: 'grid', gap: '2rem' }}>

                {/* Signup Section */}
                <section style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
                    <h2>Signup</h2>
                    <form action={signupAction} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input name="name" placeholder="Name" required style={{ padding: '8px' }} />
                        <input name="email" type="email" placeholder="Email" required style={{ padding: '8px' }} />
                        <input name="password" type="password" placeholder="Password" required style={{ padding: '8px' }} />
                        <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', border: 'none' }}>Sign Up</button>
                    </form>
                    {signupState?.message && <p style={{ color: signupState.success ? 'green' : 'red' }}>{signupState.message}</p>}
                    {signupState?.errors && <pre>{JSON.stringify(signupState.errors, null, 2)}</pre>}
                </section>

                {/* Login Section */}
                <section style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
                    <h2>Login</h2>
                    <form action={loginAction} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input name="email" type="email" placeholder="Email" required style={{ padding: '8px' }} />
                        <input name="password" type="password" placeholder="Password" required style={{ padding: '8px' }} />
                        <button type="submit" style={{ padding: '10px', background: 'green', color: 'white', border: 'none' }}>Log In</button>
                    </form>
                    {loginState?.message && <p style={{ color: loginState.success ? 'green' : 'red' }}>{loginState.message}</p>}
                </section>

                {/* Forgot Password Section */}
                <section style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
                    <h2>Forgot Password</h2>
                    <form action={forgotPasswordAction} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input name="email" type="email" placeholder="Email" required style={{ padding: '8px' }} />
                        <button type="submit" style={{ padding: '10px', background: 'orange', color: 'white', border: 'none' }}>Reset Password</button>
                    </form>
                    {forgotPasswordState?.message && <p style={{ color: forgotPasswordState.success ? 'green' : 'red' }}>{forgotPasswordState.message}</p>}
                </section>

                {/* Resend Verification Section */}
                <section style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
                    <h2>Resend Verification Email</h2>
                    <form action={resendVerificationAction} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input name="email" type="email" placeholder="Email" required style={{ padding: '8px' }} />
                        <button type="submit" style={{ padding: '10px', background: 'purple', color: 'white', border: 'none' }}>Resend Verification</button>
                    </form>
                    {resendVerificationState?.message && <p style={{ color: resendVerificationState.success ? 'green' : 'red' }}>{resendVerificationState.message}</p>}
                </section>

                {/* Logout Section */}
                <section style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
                    <h2>Logout</h2>
                    <form action={logoutAction}>
                        <button type="submit" style={{ padding: '10px', background: 'red', color: 'white', border: 'none' }}>Log Out</button>
                    </form>
                    {logoutState?.message && <p style={{ color: logoutState.success ? 'green' : 'red' }}>{logoutState.message}</p>}
                </section>

            </div>
        </div>
    );
}
