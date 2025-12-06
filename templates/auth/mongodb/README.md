# Next.js Auth Template

A complete, production-ready authentication template for Next.js App Router applications using MongoDB, Mongoose, and Server Actions.

## Features

- **Signup** (Email/Password + Name)
- **Login** (Session via HTTP-only Cookie)
- **Logout**
- **Forgot Password & Reset Password**
- **Email Verification**
- **Resend Verification Email**
- **Session Management Helper**

## Installation

1.  **Dependencies**:
    Install the required packages:
    ```bash
    npm install mongoose zod resend bcryptjs jsonwebtoken
    npm install -D @types/bcryptjs @types/jsonwebtoken
    ```

2.  **Files**:
    - Copy the contents of this folder (`templates/auth`) into your project, e.g., into `src/lib/auth`.
    - **Frontend**: Copy the files from `frontend/` into your `app/auth/` directory:
        - `frontend/VerifyEmailPage.tsx` -> `src/app/auth/verify-email/page.tsx`
        - `frontend/ResetPasswordPage.tsx` -> `src/app/auth/reset-password/page.tsx`

3.  **Environment Variables**:
    Add these to your `.env.local` or `.env` file:
    ```env
    DATABASE_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/my-app
    RESEND_API_KEY=re_123456789  # Optional: If omitted, emails print to console
    JWT_SECRET=your-super-secret-key
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

4.  **Database Connection**:
    Ensure you have a MongoDB connection utility.
    - Open `actions.ts`.
    - Check the import: `import dbConnect from '@/connectors/mongodb';`.
    - Update this path to match your project's database connection file.

## Usage

### Server Actions
Import actions directly into your Client Components:

```tsx
import { signup, login, logout, getSession } from '@/lib/auth/actions';

// Use with useFormState
const [state, action] = useFormState(signup, initialState);
```

### Session Check
Use `getSession()` to verify the user on the server or client (via actions):

```ts
const session = await getSession();
if (session) {
  console.log("Logged in as:", session.email);
}
```

## Security Note

- This template uses `jsonwebtoken` stored in an **HTTP-only cookie** for sessions.
- Ensure `JWT_SECRET` is strong and kept secret.
- In production, set `secure: true` for cookies (already handled in `actions.ts` via `process.env.NODE_ENV`).
