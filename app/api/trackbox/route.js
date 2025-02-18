export async function POST(req) {
    try {
      const formData = await req.json();
  
      const trackboxPayload = {
        ai: process.env.TRACKBOX_AI,
        ci: "1",
        gi: process.env.TRACKBOX_GI,
        userip: formData.ip,
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        phone: formData.phoneNumber,
        so: "your_funnel_name",
        lg: "EN",
      };
  
      const response = await fetch("https://affiliate.alphanetwork.io/api/signup/procform", {
        method: "POST",
        headers: {
          "x-trackbox-username": process.env.TRACKBOX_USERNAME,
          "x-trackbox-password": process.env.TRACKBOX_PASSWORD,
          "x-api-key": process.env.TRACKBOX_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trackboxPayload),
      });
  
      const result = await response.json();
      return Response.json({ success: true, result });
    } catch (error) {
      return Response.json({ error: "Gabim gjatë dërgimit" }, { status: 500 });
    }
  }
  