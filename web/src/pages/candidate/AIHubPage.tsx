import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import styles from './AIHubPage.module.css';

export const AIHubPage = () => {
  return (
    <div className={styles.page}>
      
      {/* Tool Tabs */}
      <div className={styles.toolTabs}>
        <div className={styles.container}>
          <button className={`${styles.toolTab} ${styles.active}`}>ATS Resume Parser</button>
          <button className={styles.toolTab}>Resume Optimizer</button>
          <button className={styles.toolTab}>Cover Letter Builder</button>
          <button className={styles.toolTab}>Mock Interview Simulator</button>
          <button className={styles.toolTab}>Career Roadmap</button>
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
                  <div className={styles.uploadFile}>Arjun_Kumar_Resume_2025.pdf (142 KB)</div>
                  <Button variant="outline" size="sm" className={styles.changeBtn}>Change File</Button>
                </div>

                <div className={styles.jdBox}>
                  <div className={styles.jdTitle}>Target Job Description</div>
                  <textarea 
                    className={styles.jdTextarea} 
                    defaultValue="Senior React Native Developer at Infosys Limited. Requires 5+ years experience, TypeScript, Redux Toolkit, Expo, and GraphQL API integration."
                  />
                </div>
              </div>

              <Button className={styles.fullWidthBtn}>Run Deep ATS Analysis</Button>
            </Card>

            {/* ANALYSIS RESULTS */}
            <Card className={styles.panelCard}>
              <h2 className={styles.panelTitle}>ATS Analysis Summary</h2>
              <p className={styles.panelDesc}>Analysis results for Infosys — Senior React Native Engineer (JD-8921)</p>
              
              <div className={styles.atsResultsBox}>
                <div className={styles.gaugeWrapper}>
                  <div className={styles.gaugeCircle}>
                    <div className={styles.gaugeInner}>
                      <div className={styles.gaugeVal}>84</div>
                      <div className={styles.gaugeLbl}>Score</div>
                    </div>
                  </div>
                </div>

                <div className={styles.meterContainer}>
                  <div className={styles.meterRow}>
                    <div className={styles.meterHead}><span>Keyword Alignment</span><span>88%</span></div>
                    <div className={styles.meterBg}><div className={styles.meterFill} style={{ width: '88%' }}></div></div>
                  </div>
                  <div className={styles.meterRow}>
                    <div className={styles.meterHead}><span>Format Parseability</span><span>72%</span></div>
                    <div className={styles.meterBg}><div className={styles.meterFill} style={{ width: '72%' }}></div></div>
                  </div>
                  <div className={styles.meterRow}>
                    <div className={styles.meterHead}><span>Work Experience Fit</span><span>92%</span></div>
                    <div className={styles.meterBg}><div className={styles.meterFill} style={{ width: '92%' }}></div></div>
                  </div>
                </div>
              </div>

              <div className={styles.keywordsSection}>
                <div className={styles.keywordsTitle}>Matched Keywords (12 Found)</div>
                <div className={styles.chipGroup}>
                  <span className={`${styles.chip} ${styles.chipMatch}`}>React Native</span>
                  <span className={`${styles.chip} ${styles.chipMatch}`}>TypeScript</span>
                  <span className={`${styles.chip} ${styles.chipMatch}`}>Redux Toolkit</span>
                  <span className={`${styles.chip} ${styles.chipMatch}`}>Mobile Architecture</span>
                  <span className={`${styles.chip} ${styles.chipMatch}`}>REST APIs</span>
                </div>

                <div className={styles.keywordsTitle} style={{ marginTop: '1.5rem' }}>Missing Critical Keywords (3 Required)</div>
                <div className={styles.chipGroup}>
                  <span className={`${styles.chip} ${styles.chipMissing}`}>GraphQL</span>
                  <span className={`${styles.chip} ${styles.chipMissing}`}>Expo Framework</span>
                  <span className={`${styles.chip} ${styles.chipMissing}`}>AWS Pipeline</span>
                </div>
              </div>
            </Card>

          </div>

          {/* RIGHT COL */}
          <div className={styles.rightCol}>
            
            {/* AI CHAT */}
            <Card className={styles.panelCard}>
              <h2 className={styles.panelTitle}>AI Career Assistant</h2>
              <p className={styles.panelDesc}>Ask recommendations to improve your ATS score.</p>
              
              <div className={styles.chatBox}>
                <div className={styles.chatMessages}>
                  
                  <div className={`${styles.msg} ${styles.msgAi}`}>
                    <div className={styles.msgAvatar}>AI</div>
                    <div className={styles.msgBody}>Hello Arjun. Your ATS match score is <strong>84/100</strong> for Infosys. Adding 3 missing keywords will boost your match to 94%.</div>
                  </div>

                  <div className={`${styles.msg} ${styles.msgUser}`}>
                    <div className={`${styles.msgAvatar} ${styles.userAvatar}`}>AK</div>
                    <div className={styles.msgBody}>Where should I add GraphQL and Expo to my resume?</div>
                  </div>

                  <div className={`${styles.msg} ${styles.msgAi}`}>
                    <div className={styles.msgAvatar}>AI</div>
                    <div className={styles.msgBody}>Add a bullet point under your Flipkart experience: "Integrated GraphQL queries and Apollo Client for state management in Expo builds."</div>
                  </div>

                </div>
                
                <div className={styles.chatInputBar}>
                  <input type="text" placeholder="Ask AI assistant a question..." className={styles.chatInput} />
                  <Button size="sm">Send</Button>
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
