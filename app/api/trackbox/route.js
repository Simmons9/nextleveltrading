export const runtime = "edge"; // ✅ Correct Next.js 13+ format

export async function POST(req) {
  try {
    const body = await req.json();

    // Trackbox API Credentials (Use Vercel Environment Variables)
    const TRACKBOX_API_URL = "https://affiliate.alphanetwork.io/api/signup/procform";
    const TRACKBOX_USERNAME = process.env.TRACKBOX_USERNAME;
    const TRACKBOX_PASSWORD = process.env.TRACKBOX_PASSWORD;
    const TRACKBOX_API_KEY = process.env.TRACKBOX_API_KEY;

    // Ensure API credentials exist
    if (!TRACKBOX_USERNAME || !TRACKBOX_PASSWORD || !TRACKBOX_API_KEY) {
      return new Response(JSON.stringify({ success: false, message: "Missing API credentials" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Prepare Data Payload
    const payload = {
      ai: "2958033", // Trackbox AI ID
      ci: "1",
      gi: "22",
      userip: body.userip || "0.0.0.0",
      firstname: body.firstName,
      lastname: body.lastName,
      email: body.email,
      password: body.password || "Aa123456789!", // Trackbox requires a password
      phone: body.phoneNumber,
      so: "NextLevelTrading",
      lg: "EN",
    };

    // Call Trackbox API
    const response = await fetch(TRACKBOX_API_URL, {
      method: "POST",
      headers: {
        "x-trackbox-username": TRACKBOX_USERNAME,
        "x-trackbox-password": TRACKBOX_PASSWORD,
        "x-api-key": TRACKBOX_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return new Response(JSON.stringify({ success: response.ok, data }), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
