export const runtime = "edge"; // Next.js 13+ App Router (Edge Runtime optional)

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
      return new Response(
        JSON.stringify({ success: false, message: "Missing API credentials" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // You may pass these parameters from your client form or query params
    // For example, if the client does a fetch("/api/trackbox", { method: "POST", body: { ai: "2958033", ... } })
    // or you parse them in your client from the query string ?ai=2958033, etc.
    // Just ensure your client includes them in the request body.

    const affiliateAi = body.ai || "2958033";  // If none provided, fallback to a default
    const giParam      = body.gi || "22";      // If your gi is dynamic, can also do fallback
    const ciParam      = body.ci || "1";       // If your ci is dynamic, fallback to "1"

    // Prepare Data Payload
    const payload = {
      ai: affiliateAi,             // <== dynamic affiliate ID
      ci: ciParam,
      gi: giParam,
      userip: body.userip || "0.0.0.0",
      firstname: body.firstName,
      lastname: body.lastName,
      email: body.email,
      password: body.password || "Aa123456789!", // Trackbox requires a password
      phone: body.phoneNumber,
      so: body.so || "NextLevelTrading",         // If 'so' can also be dynamic
      lg: body.lg || "EN",                      // Language param can be dynamic
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

    return new Response(
      JSON.stringify({ success: response.ok, data }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
