// Vercel Edge Function for Activity Logging
// This creates an API endpoint at: /api/log-activity

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { 
      email, 
      name, 
      status, 
      app, 
      timestamp,
      ipAddress,
      userAgent 
    } = req.body;
    
    // Get real IP from Vercel headers
    const realIP = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress;
    
    // Create log entry
    const logEntry = {
      timestamp: timestamp || new Date().toISOString(),
      email,
      name,
      status,
      app,
      ipAddress: realIP || ipAddress,
      userAgent: req.headers['user-agent'] || userAgent,
      origin: req.headers.origin,
      referer: req.headers.referer
    };
    
    // Log to Vercel Functions console (viewable in Vercel dashboard)
    console.log('LOGIN_ACTIVITY:', JSON.stringify(logEntry));
    
    // Store in Vercel KV Storage (if you have it enabled)
    // await kv.lpush('activity_logs', JSON.stringify(logEntry));
    
    // Or send to external service
    // await fetch('YOUR_EXTERNAL_LOGGING_SERVICE', {
    //   method: 'POST',
    //   body: JSON.stringify(logEntry)
    // });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Activity logged',
      logId: Date.now() 
    });
    
  } catch (error) {
    console.error('Error logging activity:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to log activity' 
    });
  }
}