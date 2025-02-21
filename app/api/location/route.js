export default async function handler(req, res) {
    try {
      const token = process.env.IPINFO_TOKEN; // Store token in Vercel Environment Variables
      if (!token) {
        return res.status(500).json({ error: "Missing API Token" });
      }
  
      const response = await fetch(`https://ipinfo.io/json?token=${token}`);
      if (!response.ok) throw new Error("Failed to fetch location");
  
      const data = await response.json();
      res.status(200).json({ country: data.country, countryCode: data.country }); // Returns "DE", "US", etc.
    } catch (error) {
      console.error("Error fetching geolocation:", error);
      res.status(500).json({ error: "Failed to fetch geolocation" });
    }
  }