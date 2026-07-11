import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileDropZone } from '../../components/ui/FileDropZone/FileDropZone';
import { ProgressBar } from '../../components/ui/ProgressBar/ProgressBar';
import { Spinner } from '../../components/ui/Spinner/Spinner';
import { useAIChat } from '../../hooks/useAIChat';
import { scoreResume } from '../../services/ai.service';
import type { ATSScore } from '../../types/ai.types';
import styles from './AIHubPage.module.css';

export const AIHubPage = () => {
  const [activeTab, setActiveTab] = useState<'ats' | 'optimizer' | 'cover' | 'mock' | 'roadmap'>('ats');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState(
    'Senior React Native Developer at Infosys Limited. Requires 5+ years experience, TypeScript, Redux Toolkit, Expo, and GraphQL API integration.'
  );
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scoreData, setScoreData] = useState<ATSScore | null>({
    overall: 84,
    skillMatch: 88,
    experienceFit: 92,
    keywordDensity: 72,
    formatting: 85,
    keywords: [
      { keyword: 'React Native', found: true },
      { keyword: 'TypeScript', found: true },
      { keyword: 'Redux Toolkit', found: true },
      { keyword: 'Mobile Architecture', found: true },
      { keyword: 'REST APIs', found: true },
      { keyword: 'GraphQL', found: false },
      { keyword: 'Expo Framework', found: false },
      { keyword: 'AWS Pipeline', found: false },
    ],
    suggestions: [
      'Add detailed experience with Expo framework.',
      'GraphQL integration missing. Mention it under your projects.',
      'AWS deployment pipeline experience should be explicitly mentioned.',
    ],
  });

  const { messages, isLoading: isChatLoading, sendMessage } = useAIChat();
  const [chatInput, setChatInput] = useState('');

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    // Extract name or mock text if no real text extracted
    const resumeText = resumeFile
      ? `Resume file: ${resumeFile.name}. Skills: React Native, TypeScript, Redux Toolkit, Mobile Architecture, REST APIs.`
      : 'Resume placeholder. Skills: React Native, TypeScript, Redux Toolkit, Mobile Architecture, REST APIs.';

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
    sendMessage(chatInput, `You are helping the candidate Arjun Kumar optimize his resume for a Job Description. Here is his current ATS Score data: ${JSON.stringify(scoreData)}`);
    setChatInput('');
  };

  return (
    <div className={styles.page}>
      
      {/* Tool Tabs */}
      <div className={styles.toolTabs}>
        <div className={styles.container}>
          <button 
            className={`${styles.toolTab} ${activeTab === 'ats' ? styles.active : ''}`}
            onClick={() => setActiveTab('ats')}
          >
            ATS Resume Parser
          </button>
          <button 
            className={`${styles.toolTab} ${activeTab === 'optimizer' ? styles.active : ''}`}
            onClick={() => setActiveTab('optimizer')}
          >
            Resume Optimizer
          </button>
          <button 
            className={`${styles.toolTab} ${activeTab === 'cover' ? styles.active : ''}`}
            onClick={() => setActiveTab('cover')}
          >
            Cover Letter Builder
          </button>
          <button 
            className={`${styles.toolTab} ${activeTab === 'mock' ? styles.active : ''}`}
            onClick={() => setActiveTab('mock')}
          >
            Mock Interview Simulator
          </button>
          <button 
            className={`${styles.toolTab} ${activeTab === 'roadmap' ? styles.active : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            Career Roadmap
          </button>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.contentLayout}>
          
          {/* LEFT COL */}
          <div className={styles.leftCol}>
            
            {/* ATS PARSER CARD */}
            <Card className={styles.panelCard}>
              <h2 className={styles.panelTitle}>ATS Compatibility Engine</h2>
              <p className={styles.panelDesc}>Compare your current resume against target Job Descriptions to identify keyword gaps and formatting parseability.</p>
              
              <div className={styles.inputGrid}>
                <div className={styles.uploadZone}>
                  <div className={styles.uploadTitle}>Uploaded Resume</div>
                  <FileDropZone 
                    value={resumeFile}
                    onChange={setResumeFile}
                    label="Choose PDF or Word Resume"
                  />
                </div>

                <div className={styles.jdBox}>
                  <div className={styles.jdTitle}>Target Job Description</div>
                  <textarea 
                    className={styles.jdTextarea} 
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    placeholder="Paste the job description here..."
                  />
                </div>
              </div>

              <Button 
                className={styles.fullWidthBtn}
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? <><Spinner size="sm" /> Analyzing...</> : 'Run Deep ATS Analysis'}
              </Button>
            </Card>

            {/* ANALYSIS RESULTS */}
            {scoreData && (
              <Card className={styles.panelCard}>
                <h2 className={styles.panelTitle}>ATS Analysis Summary</h2>
                <p className={styles.panelDesc}>Real-time analysis compared against targets.</p>
                
                <div className={styles.atsResultsBox}>
                  <div className={styles.gaugeWrapper}>
                    <div className={styles.gaugeCircle}>
                      <div className={styles.gaugeInner}>
                        <div className={styles.gaugeVal}>{scoreData.overall}</div>
                        <div className={styles.gaugeLbl}>Score</div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.meterContainer}>
                    <div className={styles.meterRow}>
                      <ProgressBar value={scoreData.skillMatch} label="Keyword Alignment" />
                    </div>
                    <div className={styles.meterRow}>
                      <ProgressBar value={scoreData.formatting} label="Format Parseability" />
                    </div>
                    <div className={styles.meterRow}>
                      <ProgressBar value={scoreData.experienceFit} label="Work Experience Fit" />
                    </div>
                  </div>
                </div>

                <div className={styles.keywordsSection}>
                  <div className={styles.keywordsTitle}>Matched Keywords</div>
                  <div className={styles.chipGroup}>
                    {scoreData.keywords.filter(k => k.found).map((k) => (
                      <span key={k.keyword} className={`${styles.chip} ${styles.chipMatch}`}>
                        {k.keyword}
                      </span>
                    ))}
                    {scoreData.keywords.filter(k => k.found).length === 0 && (
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-slate)' }}>No matches found yet.</span>
                    )}
                  </div>

                  <div className={styles.keywordsTitle} style={{ marginTop: '1.5rem' }}>Missing Critical Keywords</div>
                  <div className={styles.chipGroup}>
                    {scoreData.keywords.filter(k => !k.found).map((k) => (
                      <span key={k.keyword} className={`${styles.chip} ${styles.chipMissing}`}>
                        {k.keyword}
                      </span>
                    ))}
                    {scoreData.keywords.filter(k => !k.found).length === 0 && (
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-success)' }}>All core keywords present!</span>
                    )}
                  </div>

                  {scoreData.suggestions.length > 0 && (
                    <div className={styles.suggestionsBox}>
                      <div className={styles.keywordsTitle}>Recommendations</div>
                      <ul className={styles.suggestionsList}>
                        {scoreData.suggestions.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            )}

          </div>

          {/* RIGHT COL */}
          <div className={styles.rightCol}>
            
            {/* AI CHAT */}
            <Card className={styles.panelCard}>
              <h2 className={styles.panelTitle}>AI Career Assistant</h2>
              <p className={styles.panelDesc}>Ask recommendations to improve your ATS score.</p>
              
              <div className={styles.chatBox}>
                <div className={styles.chatMessages}>
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`${styles.msg} ${msg.role === 'assistant' ? styles.msgAi : styles.msgUser}`}
                    >
                      <div className={`${styles.msgAvatar} ${msg.role === 'user' ? styles.userAvatar : ''}`}>
                        {msg.role === 'assistant' ? 'AI' : 'Me'}
                      </div>
                      <div className={styles.msgBody}>{msg.content}</div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className={`${styles.msg} ${styles.msgAi}`}>
                      <div className={styles.msgAvatar}>AI</div>
                      <div className={styles.msgBody}><Spinner size="sm" /> Thinking...</div>
                    </div>
                  )}
                </div>
                
                <div className={styles.chatInputBar}>
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                    placeholder="Ask AI assistant a question..." 
                    className={styles.chatInput} 
                    disabled={isChatLoading}
                  />
                  <Button size="sm" onClick={handleSendChat} disabled={isChatLoading}>Send</Button>
                </div>
              </div>
            </Card>

            {/* AUTOMATED ACTIONS */}
            <Card className={styles.panelCard}>
              <h2 className={styles.panelTitle}>Automated Actions</h2>
              <div className={styles.actionStack}>
                <Button variant="outline" className={styles.actionBtn}>Auto-Inject Missing Keywords</Button>
                <Button variant="outline" className={styles.actionBtn}>Generate Tailored Cover Letter</Button>
                <Button variant="outline" className={styles.actionBtn}>Start AI Technical Mock Interview</Button>
              </div>
            </Card>

          </div>

        </div>
      </div>
    </div>
  );
};
