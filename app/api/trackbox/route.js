export const runtime = "edge";

export async function POST(req) {
  try {
    const body = await req.json();

    const TRACKBOX_API_URL = "https://affiliate.alphanetwork.io/api/signup/procform";
    const TRACKBOX_USERNAME = process.env.TRACKBOX_USERNAME;
    const TRACKBOX_PASSWORD = process.env.TRACKBOX_PASSWORD;
    const TRACKBOX_API_KEY = process.env.TRACKBOX_API_KEY;

    if (!TRACKBOX_USERNAME || !TRACKBOX_PASSWORD || !TRACKBOX_API_KEY) {
      return new Response(JSON.stringify({ success: false, message: "Missing API credentials" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const payload = {
      ai: body.ai || "2958033",
      gi: body.gi || "22",
      ci: body.ci || "4",
      altid: body.altid || "",
      oi: body.oi || "",
      userip: body.userip || "0.0.0.0",
      firstname: body.firstName,
      lastname: body.lastName,
      email: body.email,
      phone: body.phone,
      password: body.password || "Qbwriu48",
      so: body.so || "NextLevelTrading",
      lg: body.lg || "EN",
      subid: body.sxid || "", // clickid
      extid: body.extid || "",
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

    return new Response(JSON.stringify({ success: response.ok, data, autologinUrl }), {
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
