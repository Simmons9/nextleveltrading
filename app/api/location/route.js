export async function GET() {
    try {
      const accountId = process.env.NEXT_PUBLIC_ACCOUNT_ID;
      const licenseKey = process.env.NEXT_PUBLIC_LICENSE_KEY;
  
      if (!accountId || !licenseKey) {
        return Response.json({ error: "Missing MaxMind credentials" }, { status: 500 });
      }
  
      const url = `https://geoip.maxmind.com/geoip/v2.1/city/me?account_id=${accountId}&license_key=${licenseKey}`;
  
      const response = await fetch(url, { method: 'GET' });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch location: ${errorText}`);
      }
  
      const data = await response.json();
      return Response.json(data, { status: 200 });
  
    } catch (error) {
      console.error("GeoIP Error:", error.message);
      return Response.json({ error: "Failed to fetch location", details: error.message }, { status: 500 });
    }
  }
  