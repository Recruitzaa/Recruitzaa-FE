import { useState } from 'react';
import { nanoid } from 'nanoid';
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
import {
  jobHistorySchema,
  projectItemSchema,
  itSkillItemSchema,
  referenceItemSchema,
  educationItemSchema,
  certificationItemSchema,
  getFieldErrors,
} from '../utils/profileValidation';

/**
 * List editing keyed off each item's stable `id`, not its array index.
 * Index-based editing broke as soon as the underlying list was resorted,
 * filtered, or edited from two places — the wrong row would end up saved,
 * deleted, or (Add-then-Cancel) left behind as an orphaned placeholder.
 */
export const useProfileListEdit = (profile: ProfileState) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [editingHistoryId, setEditingHistoryId] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingITSkillId, setEditingITSkillId] = useState<string | null>(null);
  const [editingReferenceId, setEditingReferenceId] = useState<string | null>(null);
  const [editingEducationId, setEditingEducationId] = useState<string | null>(null);
  const [editingCertificationId, setEditingCertificationId] = useState<string | null>(null);
  const [isUploadingCertificateFile, setIsUploadingCertificateFile] = useState(false);

  // Tracks the id of a row that was optimistically inserted by an
  // "Add new" action but not yet confirmed with Save. Lets Cancel drop the
  // placeholder instead of leaving fake data in the profile.
  const [pendingNewHistoryId, setPendingNewHistoryId] = useState<string | null>(null);
  const [pendingNewProjectId, setPendingNewProjectId] = useState<string | null>(null);
  const [pendingNewITSkillId, setPendingNewITSkillId] = useState<string | null>(null);
  const [pendingNewReferenceId, setPendingNewReferenceId] = useState<string | null>(null);
  const [pendingNewEducationId, setPendingNewEducationId] = useState<string | null>(null);
  const [pendingNewCertificationId, setPendingNewCertificationId] = useState<string | null>(null);

  const [historyForm, setHistoryForm] = useState<JobHistoryItem>({
    id: '',
    designation: '',
    company: '',
    duration: '',
    keyResponsibilities: [],
  });
  const [historyResponsibilitiesText, setHistoryResponsibilitiesText] = useState('');
  const [historyErrors, setHistoryErrors] = useState<Record<string, string>>({});

  const [projectForm, setProjectForm] = useState<ProjectItem>({
    id: '',
    name: '',
    client: '',
    duration: '',
    description: '',
  });
  const [projectErrors, setProjectErrors] = useState<Record<string, string>>({});

  const [itSkillForm, setITSkillForm] = useState<ITSkillItem>({
    id: '',
    skill: '',
    version: '',
    lastUsed: '',
    experience: '',
  });
  const [itSkillErrors, setITSkillErrors] = useState<Record<string, string>>({});

  const [referenceForm, setReferenceForm] = useState<ReferenceItem>({
    id: '',
    name: '',
    relationship: '',
    company: '',
    email: '',
    phone: '',
  });
  const [referenceErrors, setReferenceErrors] = useState<Record<string, string>>({});

  const [educationForm, setEducationForm] = useState<EducationDetails>({
    id: '',
    level: '',
    degree: '',
    university: '',
    duration: '',
    type: '',
    percentage: '',
  });
  const [educationErrors, setEducationErrors] = useState<Record<string, string>>({});

  const [certificationForm, setCertificationForm] = useState<CertificationItem>({
    id: '',
    name: '',
    issuer: '',
    issueDate: '',
    credentialId: '',
    credentialUrl: '',
    fileName: '',
    fileSizeLabel: '',
    fileDataUrl: '',
  });
  const [certificationErrors, setCertificationErrors] = useState<Record<string, string>>({});

  const startEditingHistory = (id: string) => {
    const item = profile.employmentHistory.find((entry) => entry.id === id);
    if (!item) return;
    setHistoryForm({ ...item });
    setHistoryResponsibilitiesText(item.keyResponsibilities.join('\n'));
    setHistoryErrors({});
    setEditingHistoryId(id);
  };

  const startEditingProject = (id: string) => {
    const item = profile.projects.find((entry) => entry.id === id);
    if (!item) return;
    setProjectForm({ ...item });
    setProjectErrors({});
    setEditingProjectId(id);
  };

  const startEditingITSkill = (id: string) => {
    const item = profile.itSkills.find((entry) => entry.id === id);
    if (!item) return;
    setITSkillForm({ ...item });
    setITSkillErrors({});
    setEditingITSkillId(id);
  };

  const startEditingReference = (id: string) => {
    const item = profile.references.find((entry) => entry.id === id);
    if (!item) return;
    setReferenceForm({ ...item });
    setReferenceErrors({});
    setEditingReferenceId(id);
  };

  const startEditingEducationItem = (id: string) => {
    const item = profile.education.find((entry) => entry.id === id);
    if (!item) return;
    setEducationForm({ ...item });
    setEducationErrors({});
    setEditingEducationId(id);
  };

  const startEditingCertification = (id: string) => {
    const item = profile.certifications.find((entry) => entry.id === id);
    if (!item) return;
    setCertificationForm({ ...item });
    setCertificationErrors({});
    setEditingCertificationId(id);
  };

  const addNewHistoryItem = () => {
    const newItem = {
      id: nanoid(),
      designation: 'Designation Role',
      company: 'Company Name',
      duration: 'Duration (e.g. 2023 - 2024)',
      keyResponsibilities: ['Key responsibility 1', 'Key responsibility 2'],
    };
    dispatch(updateEmploymentHistory([newItem, ...profile.employmentHistory]));
    startEditingHistory(newItem.id);
    setPendingNewHistoryId(newItem.id);
  };

  const addNewProjectItem = () => {
    const newItem = {
      id: nanoid(),
      name: 'Project Name',
      client: 'Client Name',
      duration: 'Duration',
      description: 'Brief description of the work.',
    };
    dispatch(updateProjects([newItem, ...profile.projects]));
    startEditingProject(newItem.id);
    setPendingNewProjectId(newItem.id);
  };

  const addNewITSkillItem = () => {
    const newItem = {
      id: nanoid(),
      skill: 'Skill Name',
      version: '1.0',
      lastUsed: '2026',
      experience: '1 Year 0 Months',
    };
    dispatch(updateITSkills([...profile.itSkills, newItem]));
    startEditingITSkill(newItem.id);
    setPendingNewITSkillId(newItem.id);
  };

  const addNewReferenceItem = () => {
    const newItem = {
      id: nanoid(),
      name: 'Reference Name',
      relationship: 'Reporting Manager',
      company: 'Company Name',
      email: 'name@company.com',
      phone: '+91 00000 00000',
    };
    dispatch(updateReferences([...profile.references, newItem]));
    startEditingReference(newItem.id);
    setPendingNewReferenceId(newItem.id);
  };

  const addNewEducationItem = () => {
    const newItem: EducationDetails = {
      id: nanoid(),
      level: 'Graduation',
      degree: 'Degree Name',
      university: 'University / Board Name',
      duration: '2020-2024',
      type: 'Full Time',
      percentage: '',
    };
    dispatch(updateEducation([...profile.education, newItem]));
    startEditingEducationItem(newItem.id);
    setPendingNewEducationId(newItem.id);
  };

  const addNewCertificationItem = () => {
    const newItem: CertificationItem = {
      id: nanoid(),
      name: 'Certification Name',
      issuer: 'Issuing Organization',
      issueDate: '',
      credentialId: '',
      credentialUrl: '',
      fileName: '',
      fileSizeLabel: '',
      fileDataUrl: '',
    };
    dispatch(updateCertifications([...profile.certifications, newItem]));
    startEditingCertification(newItem.id);
    setPendingNewCertificationId(newItem.id);
  };

  // Cancel handlers: if the row being edited was an unsaved "Add new"
  // placeholder, drop it from the profile instead of leaving fake data
  // behind. Otherwise just close the editor for the existing item.
  const cancelHistoryEditing = () => {
    if (pendingNewHistoryId !== null && pendingNewHistoryId === editingHistoryId) {
      dispatch(
        updateEmploymentHistory(
          profile.employmentHistory.filter((e) => e.id !== pendingNewHistoryId)
        )
      );
      setPendingNewHistoryId(null);
    }
    setHistoryErrors({});
    setEditingHistoryId(null);
  };

  const cancelProjectEditing = () => {
    if (pendingNewProjectId !== null && pendingNewProjectId === editingProjectId) {
      dispatch(updateProjects(profile.projects.filter((e) => e.id !== pendingNewProjectId)));
      setPendingNewProjectId(null);
    }
    setProjectErrors({});
    setEditingProjectId(null);
  };

  const cancelITSkillEditing = () => {
    if (pendingNewITSkillId !== null && pendingNewITSkillId === editingITSkillId) {
      dispatch(updateITSkills(profile.itSkills.filter((e) => e.id !== pendingNewITSkillId)));
      setPendingNewITSkillId(null);
    }
    setITSkillErrors({});
    setEditingITSkillId(null);
  };

  const cancelReferenceEditing = () => {
    if (pendingNewReferenceId !== null && pendingNewReferenceId === editingReferenceId) {
      dispatch(updateReferences(profile.references.filter((e) => e.id !== pendingNewReferenceId)));
      setPendingNewReferenceId(null);
    }
    setReferenceErrors({});
    setEditingReferenceId(null);
  };

  const cancelEducationEditing = () => {
    if (pendingNewEducationId !== null && pendingNewEducationId === editingEducationId) {
      dispatch(updateEducation(profile.education.filter((e) => e.id !== pendingNewEducationId)));
      setPendingNewEducationId(null);
    }
    setEducationErrors({});
    setEditingEducationId(null);
  };

  const cancelCertificationEditing = () => {
    if (
      pendingNewCertificationId !== null &&
      pendingNewCertificationId === editingCertificationId
    ) {
      dispatch(
        updateCertifications(
          profile.certifications.filter((e) => e.id !== pendingNewCertificationId)
        )
      );
      setPendingNewCertificationId(null);
    }
    setCertificationErrors({});
    setEditingCertificationId(null);
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

  const saveHistoryItem = (id: string) => {
    const candidate = {
      ...historyForm,
      keyResponsibilities: historyResponsibilitiesText
        .split('\n')
        .map((r) => r.trim())
        .filter((r) => r.length > 0),
    };
    const errors = getFieldErrors(jobHistorySchema, candidate);
    if (Object.keys(errors).length > 0) {
      setHistoryErrors(errors);
      toast.error('Fix the highlighted fields before saving.');
      return;
    }
    dispatch(
      updateEmploymentHistory(
        profile.employmentHistory.map((item) => (item.id === id ? candidate : item))
      )
    );
    setEditingHistoryId(null);
    setPendingNewHistoryId(null);
    setHistoryErrors({});
    toast.success('Employment record updated.');
  };

  const deleteHistoryItem = (id: string) => {
    dispatch(updateEmploymentHistory(profile.employmentHistory.filter((item) => item.id !== id)));
    setEditingHistoryId(null);
    setPendingNewHistoryId(null);
    toast.info('Removed employment record.');
  };

  const saveProjectItem = (id: string) => {
    const errors = getFieldErrors(projectItemSchema, projectForm);
    if (Object.keys(errors).length > 0) {
      setProjectErrors(errors);
      toast.error('Fix the highlighted fields before saving.');
      return;
    }
    dispatch(updateProjects(profile.projects.map((item) => (item.id === id ? projectForm : item))));
    setEditingProjectId(null);
    setPendingNewProjectId(null);
    setProjectErrors({});
    toast.success('Project details saved.');
  };

  const deleteProjectItem = (id: string) => {
    dispatch(updateProjects(profile.projects.filter((item) => item.id !== id)));
    setEditingProjectId(null);
    setPendingNewProjectId(null);
    toast.info('Project record deleted.');
  };

  const saveITSkillItem = (id: string) => {
    const errors = getFieldErrors(itSkillItemSchema, itSkillForm);
    if (Object.keys(errors).length > 0) {
      setITSkillErrors(errors);
      toast.error('Fix the highlighted fields before saving.');
      return;
    }
    dispatch(updateITSkills(profile.itSkills.map((item) => (item.id === id ? itSkillForm : item))));
    setEditingITSkillId(null);
    setPendingNewITSkillId(null);
    setITSkillErrors({});
    toast.success('IT Skill updated.');
  };

  const deleteITSkillItem = (id: string) => {
    dispatch(updateITSkills(profile.itSkills.filter((item) => item.id !== id)));
    setEditingITSkillId(null);
    setPendingNewITSkillId(null);
    toast.info('IT Skill removed.');
  };

  const saveReferenceItem = (id: string) => {
    const errors = getFieldErrors(referenceItemSchema, referenceForm);
    if (Object.keys(errors).length > 0) {
      setReferenceErrors(errors);
      toast.error('Fix the highlighted fields before saving.');
      return;
    }
    dispatch(
      updateReferences(profile.references.map((item) => (item.id === id ? referenceForm : item)))
    );
    setEditingReferenceId(null);
    setPendingNewReferenceId(null);
    setReferenceErrors({});
    toast.success('Reference saved.');
  };

  const deleteReferenceItem = (id: string) => {
    dispatch(updateReferences(profile.references.filter((item) => item.id !== id)));
    setEditingReferenceId(null);
    setPendingNewReferenceId(null);
    toast.info('Reference removed.');
  };

  const saveEducationItem = (id: string) => {
    const errors = getFieldErrors(educationItemSchema, educationForm);
    if (Object.keys(errors).length > 0) {
      setEducationErrors(errors);
      toast.error('Fix the highlighted fields before saving.');
      return;
    }
    dispatch(
      updateEducation(profile.education.map((item) => (item.id === id ? educationForm : item)))
    );
    setEditingEducationId(null);
    setPendingNewEducationId(null);
    setEducationErrors({});
    toast.success('Education record saved.');
  };

  const deleteEducationItem = (id: string) => {
    dispatch(updateEducation(profile.education.filter((item) => item.id !== id)));
    setEditingEducationId(null);
    setPendingNewEducationId(null);
    toast.info('Education record removed.');
  };

  const saveCertificationItem = (id: string) => {
    const errors = getFieldErrors(certificationItemSchema, certificationForm);
    if (Object.keys(errors).length > 0) {
      setCertificationErrors(errors);
      toast.error('Fix the highlighted fields before saving.');
      return;
    }
    dispatch(
      updateCertifications(
        profile.certifications.map((item) => (item.id === id ? certificationForm : item))
      )
    );
    setEditingCertificationId(null);
    setPendingNewCertificationId(null);
    setCertificationErrors({});
    toast.success('Certification saved.');
  };

  const deleteCertificationItem = (id: string) => {
    dispatch(updateCertifications(profile.certifications.filter((item) => item.id !== id)));
    setEditingCertificationId(null);
    setPendingNewCertificationId(null);
    toast.info('Certification removed.');
  };

  return {
    editingHistoryId,
    setEditingHistoryId,
    editingProjectId,
    setEditingProjectId,
    editingITSkillId,
    setEditingITSkillId,
    historyForm,
    setHistoryForm,
    historyResponsibilitiesText,
    setHistoryResponsibilitiesText,
    historyErrors,
    projectForm,
    setProjectForm,
    projectErrors,
    itSkillForm,
    setITSkillForm,
    itSkillErrors,
    editingReferenceId,
    setEditingReferenceId,
    referenceForm,
    setReferenceForm,
    referenceErrors,
    editingEducationId,
    setEditingEducationId,
    educationForm,
    setEducationForm,
    educationErrors,
    editingCertificationId,
    setEditingCertificationId,
    certificationForm,
    setCertificationForm,
    certificationErrors,
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
