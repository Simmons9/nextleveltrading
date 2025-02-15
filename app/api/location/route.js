export async function GET() {
    try {
      const ACCOUNT_ID = "1127802";
      const LICENSE_KEY = "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";
  
      const response = await fetch(
        `https://geoip.maxmind.com/geoip/v2.1/country/me?use_https=1`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${ACCOUNT_ID}:${LICENSE_KEY}`).toString("base64")}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      return new Response(JSON.stringify({ country: data.country.iso_code }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Gabim gjatë marrjes së lokacionit:", error);
      return new Response(JSON.stringify({ error: "Nuk mund të marrim vendndodhjen" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  