// interactions.js - Webhook endpoint for Discord
const crypto = require('crypto');

module.exports = async (req, res) => {
  // Handle Discord verification
  if (req.method === 'POST') {
    const signature = req.headers['x-signature-ed25519'];
    const timestamp = req.headers['x-signature-timestamp'];
    const body = JSON.stringify(req.body);
    
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY_FROM_DISCORD_PORTAL';
    
    const isVerified = verifySignature(PUBLIC_KEY, signature, timestamp, body);
    
    if (!isVerified) {
      return res.status(401).send('Invalid signature');
    }
    
    // Handle interaction
    const interaction = req.body;
    
    if (interaction.type === 1) { // PING
      return res.status(200).json({ type: 1 });
    }
    
    // Handle other interaction types...
    return res.status(200).json({ type: 4, data: { content: 'Hello from webhook!' } });
  }
  
  // GET request for verification
  return res.status(200).send('Discord webhook is running');
};

function verifySignature(publicKey, signature, timestamp, body) {
  try {
    const message = timestamp + body;
    const hash = crypto.createVerify('sha256');
    hash.update(message);
    return hash.verify(publicKey, signature, 'hex');
  } catch (error) {
    return false;
  }
}
