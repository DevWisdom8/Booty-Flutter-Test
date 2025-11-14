# bbb-backend

Clone .env.example variables to create an .env file and update variables accordingly.

## Email Verification Configuration

To enable the Gmail SMTP workflow for email verification, set the following environment variables in your `.env` file:

- `SMTP_USER`: Gmail address used to send verification emails (requires an app password).
- `SMTP_PASS`: Gmail app password.
- `SMTP_FROM`: Optional friendly from address (defaults to `SMTP_USER`).
- `APP_BASE_URL`: Base URL for this API (e.g. `http://localhost:5004`).
- `EMAIL_VERIFICATION_URL`: Optional front-end URL to handle verification; if not provided, defaults to `${APP_BASE_URL}/api/users/verify-email`.
- `EMAIL_VERIFICATION_TTL_HOURS`: Optional number of hours before verification links expire (defaults to `24`).
- `EMAIL_VERIFICATION_SUCCESS_REDIRECT`: Optional URL to redirect users to after successful verification.
- `EMAIL_VERIFICATION_FAILURE_REDIRECT`: Optional URL to redirect users to when verification fails or expires.

Make sure less secure app access is disabled and use a Gmail app password for production environments.