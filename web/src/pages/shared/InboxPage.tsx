import React, { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import { MessageSquare, Send, User, ChevronRight } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

import { defaultThreads, type Message, type Thread } from './InboxPageData';

export const InboxPage: React.FC = () => {
  const { appUser } = useAppSelector((state) => state.auth);
  const toast = useToast();
  const activeRole = appUser?.activeRole || 'CANDIDATE';
  const threadsList = defaultThreads[activeRole] || defaultThreads.CANDIDATE;

  const [activeThread, setActiveThread] = useState<Thread>(threadsList[0]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      sender: 'Me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedThread = {
      ...activeThread,
      messages: [...activeThread.messages, newMsg],
      lastMessage: newMsg.text,
      unread: false,
    };

    setActiveThread(updatedThread);
    setInputText('');
    toast.success('Message sent successfully!');

    // Simulate quick automated response
    setTimeout(() => {
      const autoResponse: Message = {
        id: `msg_${Date.now() + 1}`,
        sender: activeThread.name,
        text: `Thanks for writing! I will check my schedule and get back to you shortly.`,
        time: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
      };
      setActiveThread((prev) =>
        prev.id === activeThread.id
          ? { ...prev, messages: [...prev.messages, autoResponse], lastMessage: autoResponse.text }
          : prev
      );
    }, 1500);
  };

  return (
    <>
      <PageTransition>
        <SEO
          title="Central Messaging Hub | recruitZaa"
          description="Send direct chat updates to recruitment managers and expert coaches."
        />
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 w-full">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="text-[#c14f16]" size={20} /> Messaging Hub
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Direct chat communications with hiring teams, candidate applicants, and FAANG mentors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#131924] shadow-sm overflow-hidden h-[600px]">
            {/* Left Thread Selection Column */}
            <div className="md:col-span-1 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-y-auto">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider p-4 border-b border-slate-100 dark:border-slate-850">
                Direct Messages
              </span>
              <div className="divide-y divide-slate-100 dark:divide-slate-850">
                {threadsList.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => setActiveThread(thread)}
                    className={`w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c14f16] ${
                      activeThread.id === thread.id ? 'bg-slate-50 dark:bg-slate-900/40' : ''
                    }`}
                  >
                    <div className="flex gap-2.5 items-start">
                      <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-450 shrink-0">
                        <User size={14} />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          {thread.name}
                          {thread.unread && (
                            <span className="w-1.5 h-1.5 bg-[#c14f16] rounded-full shrink-0" />
                          )}
                        </span>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 block mt-0.5">
                          {thread.role}
                        </span>
                        <span className="text-sm text-slate-500 line-clamp-1 mt-1 block">
                          {thread.lastMessage}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-400 shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Active Conversation Chat Window */}
            <div className="md:col-span-2 flex flex-col h-full justify-between">
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/30 dark:bg-slate-900/10">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
                  {activeThread.name}
                </span>
                <span className="text-[9px] text-[#c14f16] font-bold block">
                  {activeThread.role}
                </span>
              </div>

              {/* Message Log */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/10 dark:bg-slate-900/5">
                {activeThread.messages.map((msg) => {
                  const isMe = msg.sender === 'Me';
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-xs md:max-w-md rounded-xl p-3.5 space-y-1 ${
                          isMe
                            ? 'bg-[#c14f16] text-white rounded-br-none'
                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-100 rounded-bl-none shadow-sm'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <span
                          className={`text-[8px] block text-right ${isMe ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'}`}
                        >
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input form */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-3 bg-white dark:bg-[#131924] shrink-0 items-center"
              >
                <input
                  type="text"
                  required
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Type a message to ${activeThread.name}...`}
                  className="flex-1 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus-visible:outline-2 focus-visible:outline-[#c14f16] min-h-[44px]"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  className="bg-[#c14f16] hover:bg-[#a94210] text-white p-2.5 rounded-lg transition-colors flex items-center justify-center min-h-[44px] min-w-[44px] focus-visible:outline-2 focus-visible:outline-[#c14f16]"
                >
                  <Send size={15} aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};
export default InboxPage;
