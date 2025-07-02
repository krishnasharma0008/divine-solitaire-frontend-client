// import type { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // 1. Extract client IP from headers or socket
//     let ip =
//       (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
//       req.socket.remoteAddress;

//     // 2. Handle localhost during development (fallback to public IP)
//     if (!ip || ip === '::1' || ip.startsWith('127.')) {
//       const ipRes = await fetch('https://api.ipify.org?format=json');
//       const { ip: publicIP } = await ipRes.json();
//       ip = publicIP;
//     }

//     console.log('Client IP used:', ip);

//     // 3. Use ip-api.com (free, accurate)
//     const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
//     const geoData = await geoRes.json();

//     if (geoData.status === 'success') {
//       res.status(200).json({
//         country_code: geoData.countryCode, // e.g. 'IN'
//         country: geoData.country,
//         city: geoData.city,
//         ip,
//       });
//     } else {
//       res.status(500).json({ error: 'Geo lookup failed', ip });
//     }
//   } catch (error) {
//     console.error('Geo IP API error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // STEP 1: Try to get IP from x-forwarded-for
    let ip = '';
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
      ip = forwarded.split(',')[0].trim();
    } else if (Array.isArray(forwarded)) {
      ip = forwarded[0];
    }

    // STEP 2: Fallback to remoteAddress if no header
    if (!ip || ip === '::1' || ip.startsWith('127.') || ip.startsWith('192.168.')) {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      ip = data.ip;
    }

    console.log('Detected client IP:', ip);

    // STEP 3: Call ip-api.com for geolocation
    const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
    const geoData = await geoRes.json();

    if (geoData.status === 'success') {
      res.status(200).json({
        country_code: geoData.countryCode,
        country: geoData.country,
        region: geoData.regionName,
        city: geoData.city,
        ip,
      });
    } else {
      res.status(500).json({ error: 'Geo lookup failed', ip });
    }
  } catch (error) {
    console.error('Geo IP error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
