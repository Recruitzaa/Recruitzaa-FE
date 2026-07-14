import type { ATSScore } from '../types/ai.types';

/**
 * Parses and analyzes a resume against a target job description.
 * Uses a safe simulated mock service for frontend development to prevent API key exposure.
 */
export const scoreResume = async (
  resumeText: string,
  jobDescription: string
): Promise<ATSScore> => {
  // Simulate 1500ms network latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return getMockATSScore(resumeText, jobDescription);
};

// ── Fallback / Mock ATS Generator ────────────────────────────────
const getMockATSScore = (resumeText: string, jobDescription: string): ATSScore => {
  const lowercaseJD = jobDescription.toLowerCase();
  const lowercaseResume = resumeText.toLowerCase();

  // Find candidate target keywords
  const possibleKeywords = [
    'react native',
    'typescript',
    'redux toolkit',
    'expo',
    'graphql',
    'ios',
    'android',
    'javascript',
    'mobile architecture',
    'rest api',
    'aws',
    'ci/cd',
    'docker',
    'jest',
    'unit testing',
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
    (kw) =>
      `Integrate "${kw}" into your skill list or professional summary to improve match accuracy.`
  );

  if (suggestions.length === 0) {
    suggestions.push(
      'Your resume covers all major keywords! Tailor your experience bullet points with quantitative results.'
    );
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
