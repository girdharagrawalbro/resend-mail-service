Resend Mail Service

Setup
1. Create/keep .env in this folder.
2. Add keys:
   RESEND_API_KEY=your_resend_api_key
   RESEND_FROM=onboarding@resend.dev
   RESEND_TO=your_email@example.com
   PORT=5600

This service also supports your existing key name:
API=your_resend_api_key

Run
1. npm install
2. npm run dev

Endpoints
- GET /health
- POST /api/send-test
- POST /api/send

Example /api/send body
{
  "to": "girdharagrawalbro@gmail.com",
  "subject": "Hello World",
  "html": "<p>Congrats on sending your <strong>first email</strong>!</p>"
}
