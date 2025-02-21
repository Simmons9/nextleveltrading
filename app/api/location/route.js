export async function GET() {
    try {
      const token = process.env.IPINFO_TOKEN; // Get token from Vercel Environment Variables
      if (!token) {
        console.error("❌ Missing API Token in Vercel Environment Variables.");
        return new Response(JSON.stringify({ error: "Missing API Token" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      // Fetch user geolocation from IPInfo
      const response = await fetch(`https://ipinfo.io/json?token=${token}`);
  
      if (!response.ok) {
        console.error(`❌ IPInfo API Error: ${response.status}`);
        return new Response(JSON.stringify({ error: "Failed to fetch geolocation" }), {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      const data = await response.json();
  
      // Ensure country data is present
      if (!data.country) {
        console.error("❌ Country data not found in IPInfo response");
        return new Response(JSON.stringify({ error: "Invalid geolocation response" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      return new Response(JSON.stringify({
        country: data.country,  // Full country name (e.g., "Germany")
        countryCode: data.country // ISO country code (e.g., "DE")
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
  
    } catch (error) {
      console.error("❌ Error fetching geolocation:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch geolocation" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  