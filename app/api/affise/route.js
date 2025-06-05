// app/api/affise/route.js

export const runtime = "edge";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received payload:", body); // ✅ DEBUG: Kontrollo çfarë merr API

    const {
      clickid,
      firstName,
      lastName,
      email,
      phone,
      sub1,
      sub2, 
      sub3,
      sub4
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

    // ✅ PËRDOR SUB1-SUB4 NGA BODY OSE FALLBACK NË FIRSTNAME, LASTNAME, EMAIL, PHONE
    const finalSub1 = sub1 || firstName || "";
    const finalSub2 = sub2 || lastName || "";
    const finalSub3 = sub3 || email || "";
    const finalSub4 = sub4 || phone || "";

    // ✅ DEBUG: Kontrollo vlerat para se t'i dërgosh
    console.log("Final sub values:", {
      sub1: finalSub1,
      sub2: finalSub2,
      sub3: finalSub3,
      sub4: finalSub4
    });

    // ✅ SIGUROHU QË TË DHËNAT NDIHEN DREJT
    if (!finalSub1 || !finalSub2 || !finalSub3 || !finalSub4) {
      console.warn("Some sub values are empty!", {
        sub1: finalSub1,
        sub2: finalSub2,
        sub3: finalSub3,
        sub4: finalSub4
      });
    }

    // Construct postback URL with sub parameters
    // const postbackUrl = `https://offers-alphanetwork.affise.com/postback?clickid=${encodeURIComponent(
    //   clickid
    // )}&sub1=${encodeURIComponent(finalSub1)}&sub2=${encodeURIComponent(finalSub2)}&sub3=${encodeURIComponent(finalSub3)}&sub4=${encodeURIComponent(finalSub4)}`;

const postbackUrl = `https://offers-alphanetwork.affise.com/postback?clickid=${encodeURIComponent(
  clickid
)}&custom_field1=${encodeURIComponent(finalSub1)}&custom_field2=${encodeURIComponent(finalSub2)}&custom_field3=${encodeURIComponent(finalSub3)}&custom_field4=${encodeURIComponent(finalSub4)}`;



    console.log("Calling Affise Postback URL:", postbackUrl);

    const affiseRes = await fetch(postbackUrl);
    const postbackText = await affiseRes.text();
if (affiseRes.ok) {
  return new Response(
    JSON.stringify({ 
      success: true, 
      message: postbackText,
   sentData: {
  clickid,
  custom_field1: finalSub1,
  custom_field2: finalSub2,
  custom_field3: finalSub3,
  custom_field4: finalSub4
},
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );

    } else {
      console.error("Affise rejected the postback:", postbackText);
      return new Response(
        JSON.stringify({ success: false, message: postbackText }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Affise API Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}