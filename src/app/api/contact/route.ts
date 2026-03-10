import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message, type } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["leviskibirie2110@gmail.com"],
        subject: `[Portfolio] ${type === "hire" ? "Hire Enquiry" : type === "collab" ? "Collaboration" : type === "project" ? "Project Commission" : "New Message"} from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#faf7f0;">
            <div style="background:#7c3aed;padding:24px;margin-bottom:24px;">
              <h1 style="color:white;margin:0;font-size:24px;">New Portfolio Message</h1>
              <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">Type: ${type}</p>
            </div>
            <div style="background:white;padding:24px;margin-bottom:16px;">
              <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#999;">From</p>
              <p style="margin:0;font-size:18px;font-weight:700;color:#1a1208;">${name}</p>
              <p style="margin:4px 0 0;color:#7c3aed;">${email}</p>
            </div>
            <div style="background:white;padding:24px;">
              <p style="margin:0 0 12px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#999;">Message</p>
              <p style="margin:0;font-size:15px;color:#1a1208;line-height:1.7;">${message}</p>
            </div>
            <p style="margin:24px 0 0;font-size:12px;color:#999;">Sent from levis.makejahomes.co.ke</p>
          </div>
        `,
      }),
    });
    if (res.ok) return NextResponse.json({ success: true });
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
