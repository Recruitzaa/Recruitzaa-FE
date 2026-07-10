export interface KeywordMatch {
  keyword: string;
  found: boolean;
}

export interface ATSScore {
  overall: number;
  skillMatch: number;
  experienceFit: number;
  keywordDensity: number;
  formatting: number;
  keywords: KeywordMatch[];
  suggestions: string[];
}

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
}
