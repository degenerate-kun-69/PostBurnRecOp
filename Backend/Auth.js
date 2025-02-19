require('dotenv').config();
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    
    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      // Add any other user data you need
    };
  } catch (error) {
    console.error('Error verifying Google token:', error);
    throw new Error('Invalid token');
  }
}

// Express route example
app.post('/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    const userData = await verifyGoogleToken(token);
    
    // Here you would:
    // 1. Check if user exists in your database
    // 2. Create new user if they don't exist
    // 3. Generate your app's JWT or session
    // 4. Return appropriate response
    
    res.json({
      success: true,
      user: userData
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Authentication failed'
    });
  }
});