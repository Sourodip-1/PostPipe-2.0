import { verifyEmail } from '../../../../../templates/auth/mongodb/actions';

export default async function VerifyEmailPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const token = searchParams.token as string;

    if (!token) {
        return <div>Invalid token</div>;
    }

    const result = await verifyEmail(token);

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
            <h1>Email Verification</h1>
            {result.success ? (
                <div style={{ color: 'green' }}>
                    <p>{result.message}</p>
                    <a href="/auth-demo">Go to Login</a>
                </div>
            ) : (
                <div style={{ color: 'red' }}>
                    <p>{result.message}</p>
                </div>
            )}
        </div>
    );
}
