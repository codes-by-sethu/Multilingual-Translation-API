// src/models/TranslationModel.ts
import { Schema, model, models } from 'mongoose';

interface ITranslationDoc {
    originalText: string;
    sourceLang: string;
    targetLang: string;
    translatedText: string;
    provider: 'gemini' | 'libre';
    wordCount: number;
}

const TranslationSchema = new Schema<ITranslationDoc>({
    originalText: { type: String, required: true, maxlength: 5000 },
    sourceLang: { type: String, required: true, default: 'auto' },
    targetLang: { type: String, required: true },
    translatedText: { type: String, required: true },
    provider: { type: String, enum: ['gemini', 'libre'], default: 'gemini' },
    wordCount: { type: Number, default: 0, min: 0 }
}, {
    timestamps: true,
    indexes: [{ originalText: 1 }, { createdAt: -1 }]
});

export const TranslationModel = models.Translation || model<ITranslationDoc>('Translation', TranslationSchema);
