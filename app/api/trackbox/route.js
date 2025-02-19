export async function POST(req) {
  try {
    const body = await req.json();
    
    // Trackbox AI API Credentials
    const TRACKBOX_API_URL = "https://affiliate.alphanetwork.io/api/signup/procform ";
    const TRACKBOX_USERNAME = "june";
    const TRACKBOX_PASSWORD = "Bitcoin2025$";
    const TRACKBOX_API_KEY = "2643889w34df345676ssdas323tgc738";

    // Prepare Data Payload
    const payload = {
      ai: "2958103", // Get this from Trackbox
      ci: "1",
      gi: "81",
      userip: body.userip || "0.0.0.0",
      firstname: body.firstName,
      lastname: body.lastName,
      email: body.email,
      password: body.password || "Aa12345!", // Required by Trackbox
      phone: body.phoneNumber,
      so: "NextLevelTrading",
      lg: "EN"
    };

    // Send Data to Trackbox
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