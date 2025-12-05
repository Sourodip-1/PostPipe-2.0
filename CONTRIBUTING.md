# Contributing to Postpipe 2.0

Thank you for your interest in contributing to Postpipe 2.0! We welcome contributions from everyone.

## Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Databases**: Local or cloud instances of the databases you wish to test (MongoDB, Postgres, etc.)

## Getting Started

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/YOUR_USERNAME/PostPipe-2.0.git
    cd PostPipe-2.0
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Set up Environment**:
    Copy `.env.example` to `.env` and configure your `DATABASE_URI`.

## Development Workflow

We have two main development zones:

- **Backend Features**: Work in `src/static-server` or `src/connectors`.
  - Run: `npm run test:static`
- **Frontend/Components**: Work in `src/dynamic-lab`.
  - Run: `npm run dev:lab`

## Submitting a Pull Request

1.  Create a new branch for your feature or fix:
    ```bash
    git checkout -b feature/my-new-feature
    ```
2.  Make your changes.
3.  Ensure your code follows our style guidelines (Prettier/ESLint).
4.  Push your branch to your fork.
5.  Open a Pull Request against the `main` branch (or specific dev branch if instructed).

## Code Style

We use **Prettier** and **ESLint** to enforce code style.
Please run the following before committing:

```bash
npx prettier --write .
```
