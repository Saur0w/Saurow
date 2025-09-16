
export const runtime = 'nodejs';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
    service: string;
}

export async function POST(req: NextRequest) {
    try {
        const { name, email, message, service }: ContactFormData = await req.json();
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const user = process.env.EMAIL_USER;
        const pass = process.env.EMAIL_PASS;

        if (!user || !pass) {
            console.error('Missing email configuration');
            return NextResponse.json(
                { success: false, error: 'Email service not configured' },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user, pass },
        });

        const mailOptions: SendMailOptions = {
            from: user,
            to: user,
            subject: `New Contact Form Submission: ${service || 'General Inquiry'}`,
            text: `
        Name: ${name}
        Email: ${email}
        Service: ${service}
        Message: ${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { success: true, message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error sending email:', err);
        return NextResponse.json(
            {
                success: false,
                error: err instanceof Error ? err.message : 'Unknown error occurred',
            },
            { status: 500 }
        );
    }
}
