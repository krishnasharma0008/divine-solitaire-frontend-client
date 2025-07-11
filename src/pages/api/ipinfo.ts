import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      (req.headers['cf-connecting-ip'] as string) ||
      (req.headers['x-nf-client-connection-ip'] as string) ||
      req.socket.remoteAddress;

    if (!ip || ip === '::1' || ip.startsWith('127.') || ip.startsWith('192.168.')) {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const { ip: publicIP } = await ipRes.json();
      ip = publicIP;
    }

    console.log("Client IP used:", ip);

    const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
    const geoData = await geoRes.json();

    if (geoData.status === 'success') {
      res.status(200).json({
        country_code: geoData.countryCode,
        country: geoData.country,
        city: geoData.city,
        ip,
      });
    } else {
      res.status(500).json({ error: 'Geo lookup failed', ip });
    }
  } catch (error) {
    console.error('Geo IP API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
