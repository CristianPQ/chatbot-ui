export const DEFAULT_SYSTEM_PROMPT =
  "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.";

export const OPENAI_API_HOST =
  process.env.OPENAI_API_HOST || 'https://api.openai.com';

export const BACKEND_HOST =
  process.env.BACKEND_HOST || 'https://enso-backend.server.incodebiz.com';

export const BACKEND_API_KEY =
  process.env.BACKEND_API_KEY || 'c3bc0b07-81ca-45d4-9ad3-97e157588d26';

export const DEFAULT_RECOMMENDATIONS_MODEL =
  'embeddings/freshly_embeddings_max_1000_tokens.csv';
