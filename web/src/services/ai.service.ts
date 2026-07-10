import { openai } from '../lib/openai';
import type { ATSScore, ChatMessage } from '../types/ai.types';

/**
 * Parses and analyzes a resume against a target job description.
 * Uses OpenAI Chat Completion (or fallback mock data if no key is configured).
 */
export const scoreResume = async (
  resumeText: string,
  jobDescription: string
): Promise<ATSScore> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey || apiKey === 'sk-your_openai_key_here') {
    // Return mock alignment data to make it work immediately out-of-the-box
    return getMockATSScore(resumeText, jobDescription);
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert Applicant Tracking System (ATS) optimization engine.
Analyze the provided resume text against the job description.
Respond with a strict JSON object structure:
{
  "overall": 85, // number 0-100
  "skillMatch": 80, // number 0-100
  "experienceFit": 90, // number 0-100
  "keywordDensity": 75, // number 0-100
  "formatting": 95, // number 0-100
  "keywords": [
    { "keyword": "React Native", "found": true },
    { "keyword": "GraphQL", "found": false }
  ],
  "suggestions": [
    "Add detailed experience with Expo framework.",
    "Mention performance optimization techniques for mobile applications."
  ]
}`,
        },
        {
          role: 'user',
          content: `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('Empty response from OpenAI');

    return JSON.parse(content) as ATSScore;
  } catch (error) {
    console.error('OpenAI ATS analysis error:', error);
    return getMockATSScore(resumeText, jobDescription);
  }
};

// ── Fallback / Mock ATS Generator ────────────────────────────────
const getMockATSScore = (resumeText: string, jobDescription: string): ATSScore => {
  const lowercaseJD = jobDescription.toLowerCase();
  const lowercaseResume = resumeText.toLowerCase();

  // Find candidate target keywords
  const possibleKeywords = [
    'react native', 'typescript', 'redux toolkit', 'expo', 'graphql',
    'ios', 'android', 'javascript', 'mobile architecture', 'rest api',
    'aws', 'ci/cd', 'docker', 'jest', 'unit testing',
  ];

  const matched: { keyword: string; found: boolean }[] = [];
  possibleKeywords.forEach((kw) => {
    if (lowercaseJD.includes(kw)) {
      matched.push({
        keyword: kw,
        found: lowercaseResume.includes(kw),
      });
    }
  });

  const foundCount = matched.filter((m) => m.found).length;
  const totalCount = matched.length || 1;
  const alignmentScore = Math.round((foundCount / totalCount) * 100);

  const missing = matched.filter((m) => !m.found).map((m) => m.keyword);
  const suggestions = missing.map(
    (kw) => `Integrate "${kw}" into your skill list or professional summary to improve match accuracy.`
  );

  if (suggestions.length === 0) {
    suggestions.push('Your resume covers all major keywords! Tailor your experience bullet points with quantitative results.');
  }

  return {
    overall: Math.min(100, Math.max(40, alignmentScore + 10)),
    skillMatch: alignmentScore,
    experienceFit: lowercaseResume.includes('year') ? 85 : 65,
    keywordDensity: Math.round((foundCount / (lowercaseResume.split(' ').length || 1)) * 300),
    formatting: 85,
    keywords: matched,
    suggestions,
  };
};
