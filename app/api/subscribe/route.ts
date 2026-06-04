import { NextRequest, NextResponse } from "next/server";

// VERIFIED: Uses Kit (fka ConvertKit) API v3 form subscription endpoint.
// Env vars required:
//   NEXT_PUBLIC_KIT_FORM_ID    — your Kit form ID (public, used client-side too for direct embeds)
//   KIT_API_SECRET             — server-only Kit API secret
//   NEXT_PUBLIC_KIT_WAITLIST_TAG_ID — optional; tags subscriber as waitlist lead

export async function POST(req: NextRequest) {
  const formId = process.env.NEXT_PUBLIC_KIT_FORM_ID;
  const apiSecret = process.env.KIT_API_SECRET;

  if (!formId || !apiSecret) {
    return NextResponse.json(
      { message: "Email capture is not configured yet." },
      { status: 503 }
    );
  }

  let body: { email?: string; firstName?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const { email, firstName } = body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ message: "A valid email is required." }, { status: 422 });
  }

  const isWaitlist = req.nextUrl.searchParams.get("waitlist") === "1";

  // Subscribe to the Kit form
  const kitRes = await fetch(
    `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_secret: apiSecret,
        email,
        first_name: firstName || undefined,
      }),
    }
  );

  if (!kitRes.ok) {
    const err = await kitRes.json().catch(() => ({}));
    console.error("Kit subscribe error:", err);
    return NextResponse.json(
      { message: "Could not subscribe. Please try again." },
      { status: 502 }
    );
  }

  // Tag as waitlist lead if requested and tag ID configured
  if (isWaitlist) {
    const tagId = process.env.NEXT_PUBLIC_KIT_WAITLIST_TAG_ID;
    if (tagId) {
      await fetch(`https://api.convertkit.com/v3/tags/${tagId}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_secret: apiSecret, email }),
      }).catch(() => null); // non-blocking; best effort
    }
  }

  return NextResponse.json({ ok: true });
}
