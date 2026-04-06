import express from 'express';
import rateLimit from 'express-rate-limit';

import gemini from '../config/geminiConfig.js';
import { authenticateUser} from '../middlewares/authMiddleware.js';

const router = express.Router();

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  keyGenerator: (req) => req.userId
});


router.post('/analyze-message',authenticateUser, aiLimiter,  async (req, res) => {
  try {
    console.log('Received request for message analysis');
    const { messageContent } = req.body;
    console.log('Received message for analysis:', messageContent);
    console.log('Using API key:', process.env.GEMINI_API_KEY ? 'Yes' : 'No');
    console.log(req.headers);
    console.log(req.userId);
    const userId = req.userId || 'unknown';
    console.log(`User ID for rate limiting: ${userId}`);
    const response = await gemini.models.generateContent({
      model: "gemini-3-flash-preview",  // This is the actual model name!
      contents: `Analyze: "${messageContent}"`
    });
    
    // Send ONLY result to frontend, NOT API key
    res.json({ analysis: response.text });
    
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;