import type { APIRoute } from 'astro';
import { SMTPClient } from 'emailjs';

import { contactSchema } from '@/schemas/contact.schema';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, email, message } = result.data;
  const mainEmail = import.meta.env.SECRET_EMAIL;
  const mainPassword = import.meta.env.SECRET_EMAIL_PASSWORD;

  if (!mainEmail || !mainPassword) {
    return new Response(
      JSON.stringify({ success: false, message: 'Email configuration is missing' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  try {
    const client = new SMTPClient({
      user: mainEmail,
      password: mainPassword,
      host: 'smtp.gmail.com',
      ssl: true,
    });

    await client.sendAsync({
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      from: mainEmail,
      to: mainEmail,
      subject: `Portfolio Contact: ${name} <${email}>`,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error sending email:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: `Failed to send email: ${(error as Error)?.message}`,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
};
