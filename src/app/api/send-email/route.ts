import { NextRequest, NextResponse } from 'next/server';
import { createTransport } from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const { to, from, subject, text, htmlContent } = await request.json();

        // Option to send an email from the system to the user, and to send an email from the user to the administrator
        if (!to && !from) {
            return NextResponse.json(
                { error: 'There is no sender or recipient email.' },
                { status: 400 }
            );
        }

        if (!subject || !text) {
            return NextResponse.json(
                { error: 'Missing required fields: subject, text' },
                { status: 400 }
            );
        }

        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.FROM_EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: to || process.env.TO_EMAIL,
            subject,
            text,
            html:htmlContent
        };

        // Sending the email
        const info = await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true, info }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email', details: error },
            { status: 500 }
        );
    }
}
