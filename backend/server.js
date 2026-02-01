const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Load API key from .env
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/translations', async (req, res) => {
    const { text, sourceLang, targetLang } = req.body;

    try {
        console.log(`📥 Translation request: "${text}" (${sourceLang}→${targetLang})`);

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Translate this text from ${sourceLang} to ${targetLang}:\n\n"${text}"\n\nProvide only the translated text, no explanations.`;

        const result = await model.generateContent(prompt);
        const translatedText = await result.response.text();

        console.log(`✅ Gemini translated: "${translatedText}"`);
        res.json({ translatedText: translatedText.trim() });

    } catch (error) {
        console.error('❌ Gemini error:', error.message);
        res.status(500).json({
            error: 'Translation service unavailable',
            translatedText: `${text} (${targetLang.toUpperCase()})`
        });
    }
});

app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        ai: 'Google gemini-2.5-flash',
        ready: true
    });
});

app.listen(3001, () => {
    console.log('✅ Backend: http://localhost:3001');
    console.log('🎉 Health check: http://localhost:3001/health');
    console.log('🧠 Google Gemini AI Ready! 🚀');
});
