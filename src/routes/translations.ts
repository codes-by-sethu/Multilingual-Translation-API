import { Router } from 'express';
import { z } from 'zod';
import { TranslationService } from '../services/translationService.js';
import { TranslationModel } from '../models/TranslationModel.js';

const router = Router();

// Input validation schemas
const translateSchema = z.object({
    text: z.string().min(1).max(5000),
    sourceLang: z.string().optional(),
    targetLang: z.enum(['en', 'fr', 'es', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi'] as const)
});

const batchSchema = z.object({
    translations: z.array(translateSchema).max(10) // Max 10 for free tier
});

// Extend provider type for batch error handling
type BatchTranslationResult = {
    originalText: string;
    translatedText: string;
    provider: 'gemini' | 'libre' | 'error';
    wordCount: number;
    error?: string;
};

// Single translation
router.post('/translate', async (req, res) => {
    try {
        const { text, sourceLang, targetLang } = translateSchema.parse(req.body);
        const result = await TranslationService.translate(text, sourceLang, targetLang);

        res.json({
            success: true,
            data: result,
            metrics: { responseTime: Date.now(), cacheHit: false }
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ success: false, error: error.errors });
        }
        console.error('Translation error:', error);
        res.status(500).json({ success: false, error: 'Translation service unavailable' });
    }
});

// Batch translation
router.post('/batch', async (req, res) => {
    try {
        const { translations } = batchSchema.parse(req.body);
        const results = await TranslationService.translateBatch(translations);

        res.json({
            success: true,
            data: results as BatchTranslationResult[],
            summary: {
                total: results.length,
                successful: results.filter(r => r.provider !== 'error').length,
                failed: results.filter(r => r.provider === 'error').length
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Invalid batch request' });
    }
});

// History (last 50 translations)
router.get('/history', async (req, res) => {
    try {
        const { limit = 50, provider } = req.query;

        const query: any = {
            ...(provider && { provider }),
            translatedText: { $ne: '' }
        };

        const history = await TranslationModel.find(query)
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .select('-__v');

        res.json({ success: true, data: history });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch history' });
    }
});

// Stats dashboard
router.get('/stats', async (req, res) => {
    try {
        const stats = await TranslationService.getStats();
        res.json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Stats unavailable' });
    }
});

export { router as translationsRouter };
