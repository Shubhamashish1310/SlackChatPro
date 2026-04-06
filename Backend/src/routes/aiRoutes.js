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
    const response = await gemini.models.generateContent({
      model: "gemini-3-flash-preview",  // This is the actual model name!
      contents: `Analyze: "${messageContent} +"reply in least words as this is personal project and not for commercial use api integration of gemini 3 flash preview model"`,
      maxOutputTokens: 100
    });
    
    // Send ONLY result to frontend, NOT API key
    res.json({ analysis: response.text });
    
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;