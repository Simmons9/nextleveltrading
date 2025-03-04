export const runtime = "edge";

export async function POST(req) {
  try {
    const body = await req.json();

    const TRACKBOX_API_URL = "https://affiliate.alphanetwork.io/api/signup/procform";
    const TRACKBOX_USERNAME = process.env.TRACKBOX_USERNAME;
    const TRACKBOX_PASSWORD = process.env.TRACKBOX_PASSWORD;
    const TRACKBOX_API_KEY = process.env.TRACKBOX_API_KEY;

    if (!TRACKBOX_USERNAME || !TRACKBOX_PASSWORD || !TRACKBOX_API_KEY) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing API credentials" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const affiliateAi = body.ai || "2958033";
    const giParam = body.gi || "22";
    const ciParam = body.ci || "4";
    const altidParam = body.altid || "";
    const oiParam = body.oi || "";

    const payload = {
      ai: affiliateAi,
      gi: giParam,
      ci: ciParam,
      altid: altidParam,
      oi: oiParam,
      userip: body.userip || "0.0.0.0",
      firstname: body.firstName,
      lastname: body.lastName,
      email: body.email,
      password: body.password || "Aa123456789!",
      phone: body.phoneNumber,
      so: body.so || "NextLevelTrading",
      lg: body.lg || "EN",
    };

    const response = await fetch(TRACKBOX_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-trackbox-username": TRACKBOX_USERNAME,
        "x-trackbox-password": TRACKBOX_PASSWORD,
        "x-api-key": TRACKBOX_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const autologinUrl = data?.extras?.redirect?.url || null;

    return new Response(
      JSON.stringify({
        success: response.ok,
        data,
        autologinUrl,
      }),
      { status: response.status, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
