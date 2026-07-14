import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../hooks/useToast';
import { Badge } from '../../components/ui/Badge';
import { Sparkles, Loader2, Upload, FileText } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { updateUserProfile } from '../../store/slices/auth.slice';
import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
  const { appUser } = useSelector((state: RootState) => state.auth);
  const toast = useToast();
  const dispatch = useAppDispatch();

  // Basic name splitting
  const [firstName, ...lastNameParts] = (appUser?.displayName || '').split(' ');
  const lastName = lastNameParts.join(' ');

  // Controlled form states
  const [phone, setPhone] = useState(appUser?.phone ?? '+91 98765 43210');
  const [location, setLocation] = useState(appUser?.location ?? 'Bangalore, Karnataka');

  // Naukri Specific Job Profile Fields
  const [isCurrentlyEmployed, setIsCurrentlyEmployed] = useState(
    appUser?.isCurrentlyEmployed ?? true
  );
  const [currentCompany, setCurrentCompany] = useState(
    appUser?.currentCompany ?? 'Infosys Limited'
  );
  const [currentRole, setCurrentRole] = useState(
    appUser?.currentRole ?? 'Senior React Native Developer'
  );
  const [currentSalary, setCurrentSalary] = useState(appUser?.currentSalary ?? '18 LPA');
  const [noticePeriod, setNoticePeriod] = useState(
    appUser?.noticePeriod ?? 'Immediate (15 days or less)'
  );

  const [summary, setSummary] = useState(
    appUser?.summary ??
      'Senior React Native Developer with 5+ years of experience architecting and building high-performance mobile applications.'
  );

  // Skill tags list state
  const [skills, setSkills] = useState<string[]>(
    appUser?.skills ?? ['React Native', 'TypeScript', 'Redux Toolkit', 'GraphQL', 'Jest']
  );
  const [newSkill, setNewSkill] = useState('');

  // AI Parsing simulation states
  const [isParsing, setIsParsing] = useState(false);
  const [resumeFileName, setResumeFileName] = useState(
    appUser?.resumeFileName ??
      (appUser?.displayName
        ? `${appUser.displayName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Arjun_Kumar_Resume.pdf')
  );
  const [resumeFileSize, setResumeFileSize] = useState(appUser?.resumeFileSize ?? '124 KB');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setNewSkill('');
      dispatch(updateUserProfile({ skills: updatedSkills }));
      toast.success(`Added skill: ${newSkill.trim()}`);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((s) => s !== skillToRemove);
    setSkills(updatedSkills);
    dispatch(updateUserProfile({ skills: updatedSkills }));
    toast.info(`Removed skill: ${skillToRemove}`);
  };

  // Simulate parsing the resume for instant profile completion
  const handleTriggerAIParsing = () => {
    setIsParsing(true);
    toast.info('AI Resume Parser initializing...');

    setTimeout(() => {
      const parsedData = {
        phone: '+91 95001 22889',
        location: 'Bangalore (Hybrid)',
        isCurrentlyEmployed: true,
        currentCompany: 'Microsoft Corporation',
        currentRole: 'Lead Mobile Frontend Architect',
        currentSalary: '32 LPA',
        noticePeriod: 'Immediate (15 days or less)',
        summary:
          'Lead Mobile Frontend Architect with 6+ years of specialized experience building production-grade mobile platforms. Proven track record in state management optimizations, offline-first architectures, and hybrid application development.',
        skills: [
          'React Native',
          'TypeScript',
          'Redux Toolkit',
          'GraphQL',
          'Jest',
          'AWS Deployment',
          'Mobile App Profiling',
        ],
        resumeFileName: 'Arjun_Kumar_Lead_Architect_CV.pdf',
        resumeFileSize: '186 KB',
      };

      setPhone(parsedData.phone);
      setLocation(parsedData.location);
      setIsCurrentlyEmployed(parsedData.isCurrentlyEmployed);
      setCurrentCompany(parsedData.currentCompany);
      setCurrentRole(parsedData.currentRole);
      setCurrentSalary(parsedData.currentSalary);
      setNoticePeriod(parsedData.noticePeriod);
      setSummary(parsedData.summary);
      setSkills(parsedData.skills);
      setResumeFileName(parsedData.resumeFileName);
      setResumeFileSize(parsedData.resumeFileSize);

      dispatch(updateUserProfile(parsedData));

      setIsParsing(false);
      toast.success('AI parsed resume successfully! Pre-populated 8 profile fields.');
    }, 2000);
  };

  const handleSaveChanges = () => {
    dispatch(
      updateUserProfile({
        phone,
        location,
        isCurrentlyEmployed,
        currentCompany,
        currentRole,
        currentSalary,
        noticePeriod,
        summary,
        skills,
        resumeFileName,
        resumeFileSize,
      })
    );
    toast.success('Profile preferences saved successfully!');
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Profile</h1>
          <p className={styles.subtitle}>
            Manage personal credentials, employment terms, and resume parsing parameters.
          </p>
        </div>

        <div className={styles.contentLayout}>
          {/* Main Info Column */}
          <div className={styles.mainCol}>
            {/* AI Resume Parse Hero Card */}
            <Card className="border border-[#c14f16]/30 bg-orange-50/50 dark:bg-orange-950/10 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#c14f16] text-white rounded-lg shadow-sm">
                  <Sparkles size={24} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    One-Click Resume Autofill
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg">
                    Upload your resume on the right and let recruitZaa's ATS parser automatically
                    extract company details, current salary, designation, and notice period.
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                onClick={handleTriggerAIParsing}
                disabled={isParsing}
                className="flex items-center gap-2 bg-[#c14f16] hover:bg-[#a94210] font-bold text-xs shrink-0 self-stretch md:self-auto py-2.5 px-4"
              >
                {isParsing ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Parsing CV...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    Run AI Autofill
                  </>
                )}
              </Button>
            </Card>

            {/* Personal Information */}
            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Personal Information</h2>
              <div className={styles.formGrid}>
                <Input label="First Name" defaultValue={firstName} />
                <Input label="Last Name" defaultValue={lastName} />
                <Input
                  label="Email Address"
                  defaultValue={appUser?.email || ''}
                  type="email"
                  readOnly
                />
                <Input
                  label="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                />
                <Input
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </Card>

            {/* Naukri-Based Employment Details */}
            <Card className={styles.sectionCard}>
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Employment Details & Notice Period
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Currently Employed?
                  </span>
                  <button
                    onClick={() => setIsCurrentlyEmployed(!isCurrentlyEmployed)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isCurrentlyEmployed ? 'bg-[#c14f16]' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isCurrentlyEmployed ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {isCurrentlyEmployed ? (
                <div className={styles.formGrid}>
                  <Input
                    label="Current Company"
                    value={currentCompany}
                    onChange={(e) => setCurrentCompany(e.target.value)}
                  />
                  <Input
                    label="Current Designation"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                  />
                  <Input
                    label="Current Salary (CTC)"
                    value={currentSalary}
                    placeholder="e.g. 18 LPA"
                    onChange={(e) => setCurrentSalary(e.target.value)}
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-350">
                      Notice Period
                    </label>
                    <select
                      value={noticePeriod}
                      onChange={(e) => setNoticePeriod(e.target.value)}
                      className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:border-[#c14f16]"
                    >
                      <option>Immediate (15 days or less)</option>
                      <option>1 Month (30 days)</option>
                      <option>2 Months (60 days)</option>
                      <option>3 Months (90 days)</option>
                      <option>Serving Notice Period</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    You have toggled your status as "Not Currently Employed". Notice Period inputs
                    are disabled.
                  </p>
                </div>
              )}

              <div className={styles.actionRow}>
                <Button onClick={handleSaveChanges}>Save Profile Changes</Button>
              </div>
            </Card>

            {/* Professional Summary */}
            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Professional Summary</h2>
              <textarea
                className={styles.textarea}
                rows={5}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Write a brief professional summary..."
              />
              <div className={styles.actionRow}>
                <Button onClick={handleSaveChanges}>Update Summary</Button>
              </div>
            </Card>
          </div>

          {/* Right Sidebar Column */}
          <div className={styles.sideCol}>
            {/* Resume Upload Panel */}
            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Resume CV File</h2>
              <div className={styles.resumeZone}>
                <div className="p-3 bg-slate-100 dark:bg-slate-800 text-[#c14f16] rounded-full mb-3">
                  <FileText size={28} />
                </div>
                <div className={styles.resumeName}>{resumeFileName}</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 mb-4">
                  {resumeFileSize} &bull; Uploaded recently
                </div>

                {isParsing && (
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mb-4 overflow-hidden">
                    <div
                      className="bg-[#c14f16] h-1.5 rounded-full animate-pulse"
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                )}

                <div className={styles.resumeActions}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center justify-center gap-1.5 text-xs"
                    onClick={handleTriggerAIParsing}
                    disabled={isParsing}
                  >
                    <Upload size={13} />
                    Replace Resume
                  </Button>
                </div>
              </div>
            </Card>

            {/* Skills Panel */}
            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Core Technical Skills</h2>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {skills.length === 0 ? (
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    No skills added yet.
                  </span>
                ) : (
                  skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="primary"
                      className="inline-flex items-center gap-1 text-xs py-1 px-2.5 bg-orange-50 dark:bg-orange-950/20 text-[#c14f16] border border-orange-200 dark:border-orange-900/30"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-[9px] hover:text-[#a94210] font-black ml-1.5"
                      >
                        ✕
                      </button>
                    </Badge>
                  ))
                )}
              </div>

              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. AWS, GraphQL"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:border-[#c14f16]"
                />
                <Button size="sm" type="submit" variant="outline">
                  Add
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
