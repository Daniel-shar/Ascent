This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Contact Form Email Setup

The inquiry form collects **phone**, **email**, and **message**, then posts to `src/app/api/contact/route.ts`, which sends mail over SMTP to `CONTACT_TO_EMAIL` (default `danielshar21@gmail.com`).

1. Copy `.env.example` to `.env.local`.
2. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` for your provider (Gmail often uses `smtp.gmail.com`, port `587`, `SMTP_SECURE=false`).
3. For Gmail with 2FA, use an [App Password](https://support.google.com/accounts/answer/185833) as `SMTP_PASS`, not your normal login password.
4. Optional: `CONTACT_FROM_EMAIL` (defaults to `SMTP_USER`), `CONTACT_TO_EMAIL` (inbox that receives inquiries).

Add the same variables in Vercel under Project Settings → Environment Variables. Never commit real passwords to git.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
