import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePayload(payload: ContactPayload) {
  if (!payload.name) return "Please enter your name.";
  if (payload.name.length > 120) return "Name is too long.";

  if (!payload.email) return "Please enter your email.";
  if (!isEmail(payload.email)) return "Please enter a valid email address.";
  if (payload.email.length > 254) return "Email is too long.";

  if (!payload.message) return "Please add a message.";
  if (payload.message.length > 5000) return "Message is too long.";

  return null;
}

function getEnv(name: string) {
  const value = process.env[name];
  return value?.trim() || undefined;
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload: ContactPayload = {
    name: getString((json as Record<string, unknown>)?.name),
    email: getString((json as Record<string, unknown>)?.email),
    message: getString((json as Record<string, unknown>)?.message),
  };

  const validationError = validatePayload(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const smtpHost = getEnv("SMTP_HOST");
  const smtpUser = getEnv("SMTP_USER");
  const smtpPass = getEnv("SMTP_PASS");
  const smtpPort = Number(getEnv("SMTP_PORT") ?? "587");
  const smtpSecure = (getEnv("SMTP_SECURE") ?? "").toLowerCase() === "true" || smtpPort === 465;
  const toEmail = getEnv("CONTACT_TO_EMAIL") ?? "danielshar21@gmail.com";
  const fromEmail = getEnv("CONTACT_FROM_EMAIL") ?? smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !fromEmail || Number.isNaN(smtpPort)) {
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured. Please set SMTP environment variables.",
      },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const emailText = [
    "New contact message from Ascent website",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `Ascent Website <${fromEmail}>`,
      to: toEmail,
      replyTo: payload.email,
      subject: `New inquiry from ${payload.name}`,
      text: emailText,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again." },
      { status: 500 },
    );
  }
}
