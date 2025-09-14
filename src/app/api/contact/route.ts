import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
    service: string;
}

export async function POST(req: NextRequest) {
    try {
        const { name, email, message, service }: ContactFormData = await req.json();

        // ✅ Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // ✅ Validate environment variables
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Missing email configuration');
            return NextResponse.json(
                { success: false, error: 'Email service not configured' },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission: ${service}`, // ✅ Fixed typo: was "services"
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
        console.error("Error sending email:", err);

        return NextResponse.json(
            {
                success: false,
                error: err instanceof Error ? err.message : 'Unknown error occurred'
            },
            { status: 500 }
        );
    }
}
