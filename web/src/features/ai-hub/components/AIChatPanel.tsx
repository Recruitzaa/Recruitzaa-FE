import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Spinner } from '../../../components/ui/Spinner/Spinner';
import type { ChatMessage } from '../../../types/ai.types';

interface AIChatPanelProps {
  messages: ChatMessage[];
  isChatLoading: boolean;
  chatInput: string;
  setChatInput: (val: string) => void;
  onSendChat: () => void;
}

export const AIChatPanel: React.FC<AIChatPanelProps> = ({
  messages,
  isChatLoading,
  chatInput,
  setChatInput,
  onSendChat,
}) => {
  return (
    <Card className="p-6 bg-white dark:bg-brand-card border border-slate-200 h-[480px] flex flex-col">
      <div className="mb-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          Career guidance demo
        </h2>
        <p className="text-sm text-slate-500">
          Explore a small set of scripted resume and interview guidance. Responses are not
          personalized professional advice.
        </p>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 rounded-lg mb-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 max-w-[85%] text-sm leading-relaxed ${
              msg.role === 'assistant' ? 'self-start' : 'self-end flex-row-reverse ml-auto'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ${
                msg.role === 'user' ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              {msg.role === 'assistant' ? 'AI' : 'Me'}
            </div>
            <div
              className={`p-3 rounded-lg border ${
                msg.role === 'user'
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'bg-white dark:bg-brand-card border-slate-200 text-slate-900 dark:text-slate-100'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isChatLoading && (
          <div className="flex items-start gap-2 max-w-[85%] text-sm leading-relaxed self-start">
            <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              AI
            </div>
            <div className="p-3 rounded-lg border bg-white dark:bg-brand-card border-slate-200 text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Spinner size="sm" /> Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Chat input bar */}
      <div className="flex gap-2">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSendChat()}
          placeholder="Ask the guidance demo a question..."
          aria-label="Ask the guidance demo a question"
          className="flex-1 border border-slate-200 dark:bg-slate-950 rounded p-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-600"
          disabled={isChatLoading}
        />
        <Button
          size="sm"
          onClick={onSendChat}
          disabled={isChatLoading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 rounded text-sm"
        >
          Send
        </Button>
      </div>
    </Card>
  );
};
