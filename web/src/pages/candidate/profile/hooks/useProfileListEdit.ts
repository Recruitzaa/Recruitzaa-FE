import { useState } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { useToast } from '../../../../hooks/useToast';
import {
  updateEmploymentHistory,
  updateProjects,
  updateITSkills,
  updateReferences,
  updateEducation,
  updateCertifications,
  type ProfileState,
  type ProjectItem,
  type ITSkillItem,
  type ReferenceItem,
  type EducationDetails,
  type CertificationItem,
} from '../../../../store/slices/profileSlice';
import type { JobHistoryItem } from '../components/EmploymentTimeline';
import { readDocumentAsDataUrl, DocumentUploadError } from '../../../../lib/documentUpload';

export const useProfileListEdit = (profile: ProfileState) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [editingHistoryIndex, setEditingHistoryIndex] = useState<number | null>(null);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
  const [editingITSkillIndex, setEditingITSkillIndex] = useState<number | null>(null);
  const [editingReferenceIndex, setEditingReferenceIndex] = useState<number | null>(null);
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(null);
  const [editingCertificationIndex, setEditingCertificationIndex] = useState<number | null>(null);
  const [isUploadingCertificateFile, setIsUploadingCertificateFile] = useState(false);

  // Tracks the index of a row that was optimistically inserted by an
  // "Add new" action but not yet confirmed with Save. Lets Cancel drop the
  // placeholder instead of leaving fake data in the profile.
  const [pendingNewHistoryIndex, setPendingNewHistoryIndex] = useState<number | null>(null);
  const [pendingNewProjectIndex, setPendingNewProjectIndex] = useState<number | null>(null);
  const [pendingNewITSkillIndex, setPendingNewITSkillIndex] = useState<number | null>(null);
  const [pendingNewReferenceIndex, setPendingNewReferenceIndex] = useState<number | null>(null);
  const [pendingNewEducationIndex, setPendingNewEducationIndex] = useState<number | null>(null);
  const [pendingNewCertificationIndex, setPendingNewCertificationIndex] = useState<number | null>(
    null
  );

  const [historyForm, setHistoryForm] = useState<JobHistoryItem>({
    designation: '',
    company: '',
    duration: '',
    keyResponsibilities: [],
  });
  const [historyResponsibilitiesText, setHistoryResponsibilitiesText] = useState('');

  const [projectForm, setProjectForm] = useState<ProjectItem>({
    name: '',
    client: '',
    duration: '',
    description: '',
  });
  const [itSkillForm, setITSkillForm] = useState<ITSkillItem>({
    skill: '',
    version: '',
    lastUsed: '',
    experience: '',
  });
  const [referenceForm, setReferenceForm] = useState<ReferenceItem>({
    name: '',
    relationship: '',
    company: '',
    email: '',
    phone: '',
  });
  const [educationForm, setEducationForm] = useState<EducationDetails>({
    level: '',
    degree: '',
    university: '',
    duration: '',
    type: '',
    percentage: '',
  });
  const [certificationForm, setCertificationForm] = useState<CertificationItem>({
    name: '',
    issuer: '',
    issueDate: '',
    credentialId: '',
    credentialUrl: '',
    fileName: '',
    fileSizeLabel: '',
    fileDataUrl: '',
  });

  const startEditingHistory = (index: number) => {
    const item = profile.employmentHistory[index];
    setHistoryForm({ ...item });
    setHistoryResponsibilitiesText(item.keyResponsibilities.join('\n'));
    setEditingHistoryIndex(index);
  };

  const startEditingProject = (index: number) => {
    const item = profile.projects[index];
    setProjectForm({ ...item });
    setEditingProjectIndex(index);
  };

  const startEditingITSkill = (index: number) => {
    const item = profile.itSkills[index];
    setITSkillForm({ ...item });
    setEditingITSkillIndex(index);
  };

  const startEditingReference = (index: number) => {
    const item = profile.references[index];
    setReferenceForm({ ...item });
    setEditingReferenceIndex(index);
  };

  const startEditingEducationItem = (index: number) => {
    const item = profile.education[index];
    setEducationForm({ ...item });
    setEditingEducationIndex(index);
  };

  const startEditingCertification = (index: number) => {
    const item = profile.certifications[index];
    setCertificationForm({ ...item });
    setEditingCertificationIndex(index);
  };

  const addNewHistoryItem = () => {
    const newItem = {
      designation: 'Designation Role',
      company: 'Company Name',
      duration: 'Duration (e.g. 2023 - 2024)',
      keyResponsibilities: ['Key responsibility 1', 'Key responsibility 2'],
    };
    dispatch(updateEmploymentHistory([newItem, ...profile.employmentHistory]));
    startEditingHistory(0);
    setPendingNewHistoryIndex(0);
  };

  const addNewProjectItem = () => {
    const newItem = {
      name: 'Project Name',
      client: 'Client Name',
      duration: 'Duration',
      description: 'Brief description of the work.',
    };
    dispatch(updateProjects([newItem, ...profile.projects]));
    startEditingProject(0);
    setPendingNewProjectIndex(0);
  };

  const addNewITSkillItem = () => {
    const newItem = {
      skill: 'Skill Name',
      version: '1.0',
      lastUsed: '2026',
      experience: '1 Year 0 Months',
    };
    const updated = [...profile.itSkills, newItem];
    dispatch(updateITSkills(updated));
    startEditingITSkill(updated.length - 1);
    setPendingNewITSkillIndex(updated.length - 1);
  };

  const addNewReferenceItem = () => {
    const newItem = {
      name: 'Reference Name',
      relationship: 'Reporting Manager',
      company: 'Company Name',
      email: 'name@company.com',
      phone: '+91 00000 00000',
    };
    const updated = [...profile.references, newItem];
    dispatch(updateReferences(updated));
    startEditingReference(updated.length - 1);
    setPendingNewReferenceIndex(updated.length - 1);
  };

  const addNewEducationItem = () => {
    const newItem: EducationDetails = {
      level: 'Graduation',
      degree: 'Degree Name',
      university: 'University / Board Name',
      duration: '2020-2024',
      type: 'Full Time',
      percentage: '',
    };
    const updated = [...profile.education, newItem];
    dispatch(updateEducation(updated));
    startEditingEducationItem(updated.length - 1);
    setPendingNewEducationIndex(updated.length - 1);
  };

  const addNewCertificationItem = () => {
    const newItem: CertificationItem = {
      name: 'Certification Name',
      issuer: 'Issuing Organization',
      issueDate: '',
      credentialId: '',
      credentialUrl: '',
      fileName: '',
      fileSizeLabel: '',
      fileDataUrl: '',
    };
    const updated = [...profile.certifications, newItem];
    dispatch(updateCertifications(updated));
    startEditingCertification(updated.length - 1);
    setPendingNewCertificationIndex(updated.length - 1);
  };

  // Cancel handlers: if the row being edited was an unsaved "Add new"
  // placeholder, drop it from the profile instead of leaving fake data
  // behind. Otherwise just close the editor for the existing item.
  const cancelHistoryEditing = () => {
    if (pendingNewHistoryIndex !== null && pendingNewHistoryIndex === editingHistoryIndex) {
      dispatch(
        updateEmploymentHistory(
          profile.employmentHistory.filter((_, i) => i !== pendingNewHistoryIndex)
        )
      );
      setPendingNewHistoryIndex(null);
    }
    setEditingHistoryIndex(null);
  };

  const cancelProjectEditing = () => {
    if (pendingNewProjectIndex !== null && pendingNewProjectIndex === editingProjectIndex) {
      dispatch(updateProjects(profile.projects.filter((_, i) => i !== pendingNewProjectIndex)));
      setPendingNewProjectIndex(null);
    }
    setEditingProjectIndex(null);
  };

  const cancelITSkillEditing = () => {
    if (pendingNewITSkillIndex !== null && pendingNewITSkillIndex === editingITSkillIndex) {
      dispatch(updateITSkills(profile.itSkills.filter((_, i) => i !== pendingNewITSkillIndex)));
      setPendingNewITSkillIndex(null);
    }
    setEditingITSkillIndex(null);
  };

  const cancelReferenceEditing = () => {
    if (pendingNewReferenceIndex !== null && pendingNewReferenceIndex === editingReferenceIndex) {
      dispatch(
        updateReferences(profile.references.filter((_, i) => i !== pendingNewReferenceIndex))
      );
      setPendingNewReferenceIndex(null);
    }
    setEditingReferenceIndex(null);
  };

  const cancelEducationEditing = () => {
    if (pendingNewEducationIndex !== null && pendingNewEducationIndex === editingEducationIndex) {
      dispatch(updateEducation(profile.education.filter((_, i) => i !== pendingNewEducationIndex)));
      setPendingNewEducationIndex(null);
    }
    setEditingEducationIndex(null);
  };

  const cancelCertificationEditing = () => {
    if (
      pendingNewCertificationIndex !== null &&
      pendingNewCertificationIndex === editingCertificationIndex
    ) {
      dispatch(
        updateCertifications(
          profile.certifications.filter((_, i) => i !== pendingNewCertificationIndex)
        )
      );
      setPendingNewCertificationIndex(null);
    }
    setEditingCertificationIndex(null);
  };

  // Reads the certificate proof file (PDF/image) and stages it onto the form
  // being edited; caller still needs to press Save to persist it.
  const handleCertificateFileUpload = async (file: File) => {
    setIsUploadingCertificateFile(true);
    try {
      const doc = await readDocumentAsDataUrl(file);
      setCertificationForm((prev) => ({
        ...prev,
        fileName: doc.fileName,
        fileSizeLabel: doc.fileSizeLabel,
        fileDataUrl: doc.fileDataUrl,
      }));
      toast.success('Certificate file attached. Remember to save.');
    } catch (error) {
      const message =
        error instanceof DocumentUploadError ? error.message : 'Could not upload the file.';
      toast.error(message);
    } finally {
      setIsUploadingCertificateFile(false);
    }
  };

  const removeCertificateFile = () => {
    setCertificationForm((prev) => ({ ...prev, fileName: '', fileSizeLabel: '', fileDataUrl: '' }));
  };

  const saveHistoryItem = (index: number) => {
    const updatedHistory = [...profile.employmentHistory];
    updatedHistory[index] = {
      ...historyForm,
      keyResponsibilities: historyResponsibilitiesText
        .split('\n')
        .map((r) => r.trim())
        .filter((r) => r.length > 0),
    };
    dispatch(updateEmploymentHistory(updatedHistory));
    setEditingHistoryIndex(null);
    setPendingNewHistoryIndex(null);
    toast.success('Employment record updated.');
  };

  const deleteHistoryItem = (index: number) => {
    const updatedHistory = profile.employmentHistory.filter((_, i) => i !== index);
    dispatch(updateEmploymentHistory(updatedHistory));
    setEditingHistoryIndex(null);
    setPendingNewHistoryIndex(null);
    toast.info('Removed employment record.');
  };

  const saveProjectItem = (index: number) => {
    const updatedProjects = [...profile.projects];
    updatedProjects[index] = { ...projectForm };
    dispatch(updateProjects(updatedProjects));
    setEditingProjectIndex(null);
    setPendingNewProjectIndex(null);
    toast.success('Project details saved.');
  };

  const deleteProjectItem = (index: number) => {
    const updatedProjects = profile.projects.filter((_, i) => i !== index);
    dispatch(updateProjects(updatedProjects));
    setEditingProjectIndex(null);
    setPendingNewProjectIndex(null);
    toast.info('Project record deleted.');
  };

  const saveITSkillItem = (index: number) => {
    const updatedITSkills = [...profile.itSkills];
    updatedITSkills[index] = { ...itSkillForm };
    dispatch(updateITSkills(updatedITSkills));
    setEditingITSkillIndex(null);
    setPendingNewITSkillIndex(null);
    toast.success('IT Skill updated.');
  };

  const deleteITSkillItem = (index: number) => {
    const updatedITSkills = profile.itSkills.filter((_, i) => i !== index);
    dispatch(updateITSkills(updatedITSkills));
    setEditingITSkillIndex(null);
    setPendingNewITSkillIndex(null);
    toast.info('IT Skill removed.');
  };

  const saveReferenceItem = (index: number) => {
    const updatedReferences = [...profile.references];
    updatedReferences[index] = { ...referenceForm };
    dispatch(updateReferences(updatedReferences));
    setEditingReferenceIndex(null);
    setPendingNewReferenceIndex(null);
    toast.success('Reference saved.');
  };

  const deleteReferenceItem = (index: number) => {
    const updatedReferences = profile.references.filter((_, i) => i !== index);
    dispatch(updateReferences(updatedReferences));
    setEditingReferenceIndex(null);
    setPendingNewReferenceIndex(null);
    toast.info('Reference removed.');
  };

  const saveEducationItem = (index: number) => {
    const updatedEducation = [...profile.education];
    updatedEducation[index] = { ...educationForm };
    dispatch(updateEducation(updatedEducation));
    setEditingEducationIndex(null);
    setPendingNewEducationIndex(null);
    toast.success('Education record saved.');
  };

  const deleteEducationItem = (index: number) => {
    const updatedEducation = profile.education.filter((_, i) => i !== index);
    dispatch(updateEducation(updatedEducation));
    setEditingEducationIndex(null);
    setPendingNewEducationIndex(null);
    toast.info('Education record removed.');
  };

  const saveCertificationItem = (index: number) => {
    const updatedCertifications = [...profile.certifications];
    updatedCertifications[index] = { ...certificationForm };
    dispatch(updateCertifications(updatedCertifications));
    setEditingCertificationIndex(null);
    setPendingNewCertificationIndex(null);
    toast.success('Certification saved.');
  };

  const deleteCertificationItem = (index: number) => {
    const updatedCertifications = profile.certifications.filter((_, i) => i !== index);
    dispatch(updateCertifications(updatedCertifications));
    setEditingCertificationIndex(null);
    setPendingNewCertificationIndex(null);
    toast.info('Certification removed.');
  };

  return {
    editingHistoryIndex,
    setEditingHistoryIndex,
    editingProjectIndex,
    setEditingProjectIndex,
    editingITSkillIndex,
    setEditingITSkillIndex,
    historyForm,
    setHistoryForm,
    historyResponsibilitiesText,
    setHistoryResponsibilitiesText,
    projectForm,
    setProjectForm,
    itSkillForm,
    setITSkillForm,
    editingReferenceIndex,
    setEditingReferenceIndex,
    referenceForm,
    setReferenceForm,
    editingEducationIndex,
    setEditingEducationIndex,
    educationForm,
    setEducationForm,
    editingCertificationIndex,
    setEditingCertificationIndex,
    certificationForm,
    setCertificationForm,
    isUploadingCertificateFile,
    startEditingHistory,
    startEditingProject,
    startEditingITSkill,
    startEditingReference,
    startEditingEducationItem,
    startEditingCertification,
    addNewHistoryItem,
    addNewProjectItem,
    addNewITSkillItem,
    addNewReferenceItem,
    addNewEducationItem,
    addNewCertificationItem,
    cancelHistoryEditing,
    cancelProjectEditing,
    cancelITSkillEditing,
    cancelReferenceEditing,
    cancelEducationEditing,
    cancelCertificationEditing,
    saveHistoryItem,
    deleteHistoryItem,
    saveProjectItem,
    deleteProjectItem,
    saveITSkillItem,
    deleteITSkillItem,
    saveReferenceItem,
    deleteReferenceItem,
    saveEducationItem,
    deleteEducationItem,
    saveCertificationItem,
    deleteCertificationItem,
    handleCertificateFileUpload,
    removeCertificateFile,
  };
};
