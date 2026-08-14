import { useProfileForm } from './profile/hooks/useProfileForm';
import { Sparkles, Loader2 } from 'lucide-react';
import styles from './ProfilePage.module.css';
import { ProfileQuickLinks } from './profile/components/ProfileQuickLinks';
import { ProfileBannerCard } from './profile/components/ProfileBannerCard';
import { ResumeUploadCard } from './profile/components/ResumeUploadCard';
import { ResumeSummaryCard } from './profile/components/ResumeSummaryCard';
import { SkillsCard } from './profile/components/SkillsCard';
import { EmploymentTimeline } from './profile/components/EmploymentTimeline';
import { EducationCard } from './profile/components/EducationCard';
import { ITSkillsCard } from './profile/components/ITSkillsCard';
import { ProjectsCard } from './profile/components/ProjectsCard';
import { CareerProfileCard } from './profile/components/CareerProfileCard';
import { PersonalDetailsCard } from './profile/components/PersonalDetailsCard';
import { AccomplishmentsCard } from './profile/components/AccomplishmentsCard';
import { ReferencesCard } from './profile/components/ReferencesCard';
import { CertificationsCard } from './profile/components/CertificationsCard';

export const ProfilePage = () => {
  const form = useProfileForm();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header Title Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-brand-charcoal dark:text-white font-sans">
              My Professional Profile
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Verify credentials, configure employment metrics, and sync resume structures.
            </p>
          </div>

          <button
            type="button"
            onClick={form.requestAIParsing}
            disabled={form.isParsing}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm py-2.5 px-4 rounded-lg shadow-sm border border-transparent transition-all self-stretch md:self-auto justify-center"
          >
            {form.isParsing ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Parsing CV...
              </>
            ) : (
              <>
                <Sparkles size={14} />
                One-Click AI Autofill
              </>
            )}
          </button>
        </div>

        {/* ─── MAIN GRID LAYOUT WITH STICKY SIDEBAR ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* LEFT COLUMN: QUICK LINKS */}
          <div className="lg:col-span-1">
            <ProfileQuickLinks scrollToSection={form.scrollToSection} />
          </div>

          {/* MAIN PROFILE CARDS */}
          <div className="lg:col-span-3 space-y-6">
            {/* ─── BANNER CARD ─────────────────────────────────────────────────── */}
            <ProfileBannerCard
              profile={form.profile}
              isEditingPersonal={form.isEditingPersonal}
              setIsEditingPersonal={form.setIsEditingPersonal}
              personalForm={form.personalForm}
              setPersonalForm={form.setPersonalForm}
              personalErrors={form.personalErrors}
              startEditingPersonal={form.startEditingPersonal}
              savePersonalDetails={form.savePersonalDetails}
              handleAvatarUpload={form.handleAvatarUpload}
            />

            {/* Resume File Upload Card */}
            <ResumeUploadCard
              resumeFileName={form.resumeFileName}
              resumeFileSize={form.resumeFileSize}
              isParsing={form.isParsing}
              isAIParsingConfirmOpen={form.isAIParsingConfirmOpen}
              requestAIParsing={form.requestAIParsing}
              cancelAIParsing={form.cancelAIParsing}
              confirmAIParsing={form.confirmAIParsing}
            />

            {/* ─── RESUME HEADLINE & PROFESSIONAL SUMMARY ────────────────────────── */}
            <ResumeSummaryCard
              profile={form.profile}
              isEditingSummary={form.isEditingSummary}
              setIsEditingSummary={form.setIsEditingSummary}
              summaryForm={form.summaryForm}
              setSummaryForm={form.setSummaryForm}
              summaryErrors={form.summaryErrors}
              startEditingSummary={form.startEditingSummary}
              saveSummary={form.saveSummary}
            />

            {/* ─── KEY SKILLS CARD ──────────────────────────────────────────────── */}
            <SkillsCard
              skills={form.profile.skills}
              newSkill={form.newSkill}
              setNewSkill={form.setNewSkill}
              onAddSkill={form.handleAddSkill}
              onRemoveSkill={form.handleRemoveSkill}
            />

            {/* ─── EMPLOYMENT HISTORY TIMELINE ──────────────────────────────────── */}
            <EmploymentTimeline
              employmentHistory={form.profile.employmentHistory}
              editingHistoryId={form.editingHistoryId}
              cancelHistoryEditing={form.cancelHistoryEditing}
              startEditingHistory={form.startEditingHistory}
              historyForm={form.historyForm}
              setHistoryForm={form.setHistoryForm}
              historyResponsibilitiesText={form.historyResponsibilitiesText}
              setHistoryResponsibilitiesText={form.setHistoryResponsibilitiesText}
              historyErrors={form.historyErrors}
              saveHistoryItem={form.saveHistoryItem}
              deleteHistoryItem={form.deleteHistoryItem}
              addNewHistoryItem={form.addNewHistoryItem}
            />

            {/* ─── IT SKILLS CARD (TABULAR LAYOUT) ───────────────────────────────── */}
            <ITSkillsCard
              itSkills={form.profile.itSkills}
              editingITSkillId={form.editingITSkillId}
              cancelITSkillEditing={form.cancelITSkillEditing}
              startEditingITSkill={form.startEditingITSkill}
              itSkillForm={form.itSkillForm}
              setITSkillForm={form.setITSkillForm}
              itSkillErrors={form.itSkillErrors}
              saveITSkillItem={form.saveITSkillItem}
              deleteITSkillItem={form.deleteITSkillItem}
              addNewITSkillItem={form.addNewITSkillItem}
            />

            {/* ─── PROJECTS CARD ───────────────────────────────────────────────── */}
            <ProjectsCard
              projects={form.profile.projects}
              editingProjectId={form.editingProjectId}
              cancelProjectEditing={form.cancelProjectEditing}
              startEditingProject={form.startEditingProject}
              projectForm={form.projectForm}
              setProjectForm={form.setProjectForm}
              projectErrors={form.projectErrors}
              saveProjectItem={form.saveProjectItem}
              deleteProjectItem={form.deleteProjectItem}
              addNewProjectItem={form.addNewProjectItem}
            />

            {/* ─── EDUCATION CARD ──────────────────────────────────────────────── */}
            <EducationCard
              education={form.profile.education}
              editingEducationId={form.editingEducationId}
              cancelEducationEditing={form.cancelEducationEditing}
              startEditingEducationItem={form.startEditingEducationItem}
              educationForm={form.educationForm}
              setEducationForm={form.setEducationForm}
              educationErrors={form.educationErrors}
              saveEducationItem={form.saveEducationItem}
              deleteEducationItem={form.deleteEducationItem}
              addNewEducationItem={form.addNewEducationItem}
            />

            {/* ─── CAREER PROFILE CARD ──────────────────────────────────────────── */}
            <CareerProfileCard
              careerProfile={form.profile.careerProfile}
              isEditingCareer={form.isEditingCareer}
              setIsEditingCareer={form.setIsEditingCareer}
              startEditingCareer={form.startEditingCareer}
              careerForm={form.careerForm}
              setCareerForm={form.setCareerForm}
              careerErrors={form.careerErrors}
              saveCareerProfile={form.saveCareerProfile}
            />

            {/* ─── PERSONAL DETAILS CARD ────────────────────────────────────────── */}
            <PersonalDetailsCard
              extendedPersonal={form.profile.extendedPersonal}
              isEditingExtendedPersonal={form.isEditingExtendedPersonal}
              setIsEditingExtendedPersonal={form.setIsEditingExtendedPersonal}
              startEditingExtendedPersonal={form.startEditingExtendedPersonal}
              extendedPersonalForm={form.extendedPersonalForm}
              setExtendedPersonalForm={form.setExtendedPersonalForm}
              extendedPersonalErrors={form.extendedPersonalErrors}
              saveExtendedPersonal={form.saveExtendedPersonal}
            />

            {/* ─── BLOCK 10: ACCOMPLISHMENTS CARD ─────────────────────────────────── */}
            <AccomplishmentsCard
              accomplishments={form.profile.accomplishments}
              isEditingAccomplishments={form.isEditingAccomplishments}
              setIsEditingAccomplishments={form.setIsEditingAccomplishments}
              startEditingAccomplishments={form.startEditingAccomplishments}
              accomplishmentsForm={form.accomplishmentsForm}
              setAccomplishmentsForm={form.setAccomplishmentsForm}
              accomplishmentsErrors={form.accomplishmentsErrors}
              saveAccomplishments={form.saveAccomplishments}
            />

            {/* ─── CERTIFICATIONS & LICENSES CARD ─────────────────────────────────── */}
            <CertificationsCard
              certifications={form.profile.certifications}
              editingCertificationId={form.editingCertificationId}
              cancelCertificationEditing={form.cancelCertificationEditing}
              startEditingCertification={form.startEditingCertification}
              certificationForm={form.certificationForm}
              setCertificationForm={form.setCertificationForm}
              certificationErrors={form.certificationErrors}
              saveCertificationItem={form.saveCertificationItem}
              deleteCertificationItem={form.deleteCertificationItem}
              addNewCertificationItem={form.addNewCertificationItem}
              isUploadingCertificateFile={form.isUploadingCertificateFile}
              handleCertificateFileUpload={form.handleCertificateFileUpload}
              removeCertificateFile={form.removeCertificateFile}
            />

            {/* ─── BLOCK 11: PROFESSIONAL REFERENCES CARD ─────────────────────────── */}
            <ReferencesCard
              references={form.profile.references}
              editingReferenceId={form.editingReferenceId}
              cancelReferenceEditing={form.cancelReferenceEditing}
              startEditingReference={form.startEditingReference}
              referenceForm={form.referenceForm}
              setReferenceForm={form.setReferenceForm}
              referenceErrors={form.referenceErrors}
              saveReferenceItem={form.saveReferenceItem}
              deleteReferenceItem={form.deleteReferenceItem}
              addNewReferenceItem={form.addNewReferenceItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
