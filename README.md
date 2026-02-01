# Multilingual Translation API

A Node.js + TypeScript API for real-time multilingual translation using Gemini and LibreTranslate as fallback.

## Features

1. Single and batch translations
1. Automatic cache with NodeCache
1. Persistent storage using MongoDB
1. Translation statistics & history

## Supported Languages

- English (en)
- French (fr)
- Spanish (es)
- German (de)
- Italian (it)
- Portuguese (pt)
- Russian (ru)
- Chinese (zh)
- Japanese (ja)
- Korean (ko)
- Arabic (ar)
- Hindi (hi)

## Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd multilingual-translation-api
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:

   ```
   GOOGLE_GEMINI_API_KEY=<your_api_key>
   MONGODB_URI=<your_mongodb_uri>
   PORT=3000
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

## API Endpoints

1. **POST /translate**

   * Request body: `{ text, sourceLang?, targetLang }`
   * Returns: Translated text and provider info

2. **POST /batch**

   * Request body: `{ translations: [{ text, sourceLang?, targetLang }] }`
   * Returns: Array of translations with error handling

3. **GET /history**

   * Returns last 50 translations (filter by provider optional)

4. **GET /stats**

   * Returns total translations, cache hit rate, and usage per provider

## License

MIT