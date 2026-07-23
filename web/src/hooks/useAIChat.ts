import { useState } from 'react';
import type { ChatMessage } from '../types/ai.types';

export const useAIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'This is a scripted guidance demo. Ask about general resume structure or interview preparation.',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string, systemPrompt?: string) => {
    if (!text.trim()) return;
    if (systemPrompt) {
      console.debug('System prompt provided to mock AI chat:', systemPrompt);
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Simulate 1500ms network latency
    setTimeout(() => {
      let mockReply = `That is a great question. Based on standard ATS guidelines, here is my suggestion: 
- Try to make your action verbs strong (e.g., "Led", "Architected", "Optimized" instead of "Responsible for").
- Include metric-driven accomplishments, like "Improved rendering performance by 25% using virtualized lists".
- Make sure keywords like "React Native", "TypeScript", and "Redux" are explicitly listed under your Technical Skills section.`;

      if (text.toLowerCase().includes('resume') || text.toLowerCase().includes('ats')) {
        mockReply = `To optimize your resume for the ATS:
1. Ensure your PDF has selectable text (not scanned images).
2. Avoid multi-column layouts as some older parsers struggle with reading order.
3. List skills in plain text rather than using graphical rating stars or meters.
4. Align the job titles on your resume closely with the ones in the job descriptions.`;
      } else if (text.toLowerCase().includes('interview') || text.toLowerCase().includes('prep')) {
        mockReply = `For React Native interview preparation:
- Be ready to explain the architecture difference between the Bridge and the New Architecture (TurboModules/Fabric).
- Brush up on performance optimizations: FlashList vs FlatList, useMemo/useCallback, and native thread blocking.
- Practice explaining state management choices (Redux Toolkit vs Context API vs Zustand).`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: mockReply,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1500);
  };

  return { messages, isLoading, sendMessage };
};
