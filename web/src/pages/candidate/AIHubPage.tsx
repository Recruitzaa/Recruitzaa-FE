import { useState } from 'react';
import { ATSCompatibilityEngine } from '../../features/ai-hub/components/ATSCompatibilityEngine';
import { ResumeOptimizer } from '../../features/ai-hub/components/ResumeOptimizer';
import { AIChatPanel } from '../../features/ai-hub/components/AIChatPanel';
import { scoreResume } from '../../services/ai.service';
import { useAIChat } from '../../hooks/useAIChat';
import type { ATSScore } from '../../types/ai.types';
import { useAppSelector } from '../../store/hooks';
import { SEO } from '../../components/seo/SEO';

/**
 * AIHubPage — Main Candidate AI Tools Hub
 * Features ATS parser comparison, Bullet optimizer, and Career assistant chat.
 */
export const AIHubPage = () => {
  const [activeTab, setActiveTab] = useState<'ats' | 'optimizer' | 'chat'>('ats');
  const [resumeText, setResumeText] = useState('');
  const [jdText, setJdText] = useState('');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scoreData, setScoreData] = useState<ATSScore | null>(null);

  const appUser = useAppSelector((state) => state.auth.appUser);
  const displayName = appUser?.displayName || 'the candidate';

  const { messages, isLoading: isChatLoading, sendMessage } = useAIChat();
  const [chatInput, setChatInput] = useState('');

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const results = await scoreResume(resumeText, jdText);
      setScoreData(results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    sendMessage(
      chatInput,
      `You are helping ${displayName} optimize their resume for a Job Description. Here is their current ATS Score data: ${JSON.stringify(
        scoreData
      )}`
    );
    setChatInput('');
  };

  return (
    <div className="flex flex-col">
      <SEO
        title="AI Career Tools | Recruitzaa"
        description="Compare your resume against JD requirements and optimize keywords."
      />
      {/* Page Title */}
      <div className="max-w-6xl mx-auto w-full px-6 pt-6">
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">AI Career Tools</h1>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 px-6 py-1">
        <div
          className="max-w-6xl mx-auto flex gap-6 overflow-x-auto"
          role="tablist"
          aria-label="AI Hub Tools"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'ats'}
            className={`py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'ats'
                ? 'border-brand-primary text-brand-primary dark:text-brand-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('ats')}
          >
            ATS Score & Keywords
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'optimizer'}
            className={`py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'optimizer'
                ? 'border-brand-primary text-brand-primary dark:text-brand-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('optimizer')}
          >
            Resume Optimizer
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'chat'}
            className={`py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'chat'
                ? 'border-brand-primary text-brand-primary dark:text-brand-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('chat')}
          >
            Career Coach
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto w-full px-6 py-8">
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
          These tools offer suggestions to help you improve your resume. They are not official
          hiring assessments.
        </div>
        {activeTab === 'ats' && (
          <ATSCompatibilityEngine
            resumeText={resumeText}
            setResumeText={setResumeText}
            jdText={jdText}
            setJdText={setJdText}
            isAnalyzing={isAnalyzing}
            scoreData={scoreData}
            onRunAnalysis={handleRunAnalysis}
          />
        )}
        {activeTab === 'optimizer' && <ResumeOptimizer />}
        {activeTab === 'chat' && (
          <AIChatPanel
            messages={messages}
            isChatLoading={isChatLoading}
            chatInput={chatInput}
            setChatInput={setChatInput}
            onSendChat={handleSendChat}
          />
        )}
      </div>
    </div>
  );
};
