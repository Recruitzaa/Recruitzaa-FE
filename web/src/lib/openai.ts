import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey: apiKey || 'dummy-key-to-prevent-crash-during-build',
  dangerouslyAllowBrowser: true, // required for client-side usage in a single-page React app
});
