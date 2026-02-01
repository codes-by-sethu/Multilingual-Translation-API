// backend/server.js - PRODUCTION READY w/ Helmet + Zod + Gemini AI
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { z } = require('zod');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// 🛡️ Security + Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));

// Load API key
require('dotenv').config();

// Initialize Gemini
// Note: Use a standard model like 'gemini-1.5-flash' for better rate limits
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Zod validation schema
const translationSchema = z.object({
    text: z.string().min(1).max(1000, 'Text too long'),
    sourceLang: z.string().min(2).max(20), // Increased max slightly for full names
    targetLang: z.string().min(2).max(20)
});

app.post('/api/translations', async (req, res) => {
    // Define inputs outside try block so they are available if we need them in catch (optional)
    // But safest is to access req.body in catch

    try {
        // 1. Validate and Parse Input
        const { text, sourceLang, targetLang } = translationSchema.parse(req.body);

        console.log(`📥 Translation: "${text}" (${sourceLang}→${targetLang})`);

        // 2. Google Gemini AI
        // Switched to 'gemini-1.5-flash' for speed and reliability
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Translate "${text}" from ${sourceLang} to ${targetLang}. Return ONLY the translated text.`;

        const result = await model.generateContent(prompt);
        const translatedText = await result.response.text();

        console.log(`✅ Gemini: "${translatedText.trim()}"`);
        res.json({ translatedText: translatedText.trim() });

    } catch (error) {
        // Handle Zod Validation Errors
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: 'Invalid input',
                details: error.errors
            });
        }

        console.error('❌ Gemini error:', error.message);

        // Handle Rate Limits (429) specifically
        if (error.message.includes('429') || error.message.includes('Quota')) {
            return res.status(429).json({
                error: 'Service busy. Please try again in a few seconds.',
                // SAFE FALLBACK: Use req.body.text directly to avoid ReferenceError
                translatedText: `${req.body.text || 'Text'} (${req.body.targetLang?.toUpperCase() || 'TARGET'})`
            });
        }

        // Generic Server Error
        res.status(500).json({
            error: 'AI service unavailable',
            // SAFE FALLBACK: Use req.body.text directly
            translatedText: `${req.body.text || 'Text'} (${req.body.targetLang?.toUpperCase() || 'TARGET'})`
        });
    }
});

app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        ai: 'Google gemini-2.5-flash',
        timestamp: new Date().toISOString()
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`✅ Backend: http://localhost:${PORT}`);
    console.log(`🎉 Health: http://localhost:${PORT}/health`);
    console.log('🛡️ Helmet + Zod + Gemini AI READY! 🚀');
});