import { useState } from 'react';
import type { ChatMessage } from '../types/ai.types';
import { openai } from '../lib/openai';

export const useAIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am your Recruitzaa AI Career Copilot. Upload your resume or ask me any question about your job application, resume optimization, or interview prep!',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string, systemPrompt?: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey || apiKey === 'sk-your_openai_key_here') {
      // Mock AI response delay
      setTimeout(() => {
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `I received your question: "${text}". To get real-time AI suggestions, please add your VITE_OPENAI_API_KEY inside the .env file!`,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsLoading(false);
      }, 800);
      return;
    }

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt } as const] : []),
          ...messages.map((m) => ({ role: m.role, content: m.content } as const)),
          { role: 'user', content: text } as const,
        ],
      });

      const aiText = response.choices[0]?.message?.content ?? "I'm sorry, I couldn't generate a response.";
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiText,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('AI Career Assistant chat error:', error);
      const errMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'There was an issue connecting to the AI service. Please check your network connection or API Key.',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage };
};
