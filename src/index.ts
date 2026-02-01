import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import { translationsRouter } from './routes/translations';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security & Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/translation-api')
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB error:', err));

// Routes
app.use('/api/translations', translationsRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
