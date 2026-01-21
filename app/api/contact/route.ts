import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, projectType, message } = await request.json();

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        const projectTypeLabels: Record<string, string> = {
            web: "Web Development",
            app: "App Development",
            consultation: "Web Consultation",
        };

        const { data, error } = await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            to: ["hello@dimario.dev"],
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Project Type:</strong> ${projectTypeLabels[projectType] || "Not specified"}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
            `,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json(
                { error: "Failed to send email" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
