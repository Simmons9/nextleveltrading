export const runtime = "edge";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      clickid,
      firstName,
      lastName,
      email,
      phone,
    } = body;

    if (!clickid) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing clickid" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // ✅ Krijo URL-n për postback me sub1 - sub4 (siç kërkon Affise)
    const postbackUrl = `https://offers-alphanetwork.affise.com/postback?clickid=${encodeURIComponent(clickid)}&sub1=${encodeURIComponent(firstName || "")}&sub2=${encodeURIComponent(lastName || "")}&sub3=${encodeURIComponent(email || "")}&sub4=${encodeURIComponent(phone || "")}`;

    console.log("Calling Affise Postback URL:", postbackUrl);

    // ✅ Dërgo te Affise
    const affiseRes = await fetch(postbackUrl);
    const postbackText = await affiseRes.text();

    if (affiseRes.ok) {
      return new Response(
        JSON.stringify({ success: true, message: postbackText }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: postbackText }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

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
