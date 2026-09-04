import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json();

    const profileUuid = process.env.HOSTINGER_REACH_PROFILE_UUID;
    const apiToken = process.env.HOSTINGER_REACH_API_TOKEN;

    if (!profileUuid || !apiToken) {
      console.error("❌ Hostinger Reach env vars missing");
      return NextResponse.json(
        { error: "Reach not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://developers.hostinger.com/api/reach/v1/profiles/${profileUuid}/contacts`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("❌ Hostinger Reach error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to add contact to Reach" },
        { status: response.status }
      );
    }

    console.log("✅ Added to Hostinger Reach:", email);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ Reach subscribe error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
