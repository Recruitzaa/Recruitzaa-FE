import { useState } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { useToast } from '../../../../hooks/useToast';
import {
  updateEmploymentHistory,
  updateProjects,
  updateITSkills,
  type ProfileState,
  type ProjectItem,
  type ITSkillItem,
} from '../../../../store/slices/profileSlice';
import type { JobHistoryItem } from '../components/EmploymentTimeline';

export const useProfileListEdit = (profile: ProfileState) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [editingHistoryIndex, setEditingHistoryIndex] = useState<number | null>(null);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
  const [editingITSkillIndex, setEditingITSkillIndex] = useState<number | null>(null);

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

  const addNewHistoryItem = () => {
    const newItem = {
      designation: 'Designation Role',
      company: 'Company Name',
      duration: 'Duration (e.g. 2023 - 2024)',
      keyResponsibilities: ['Key responsibility 1', 'Key responsibility 2'],
    };
    dispatch(updateEmploymentHistory([newItem, ...profile.employmentHistory]));
    startEditingHistory(0);
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
    toast.success('Employment record updated.');
  };

  const deleteHistoryItem = (index: number) => {
    const updatedHistory = profile.employmentHistory.filter((_, i) => i !== index);
    dispatch(updateEmploymentHistory(updatedHistory));
    setEditingHistoryIndex(null);
    toast.info('Removed employment record.');
  };

  const saveProjectItem = (index: number) => {
    const updatedProjects = [...profile.projects];
    updatedProjects[index] = { ...projectForm };
    dispatch(updateProjects(updatedProjects));
    setEditingProjectIndex(null);
    toast.success('Project details saved.');
  };

  const deleteProjectItem = (index: number) => {
    const updatedProjects = profile.projects.filter((_, i) => i !== index);
    dispatch(updateProjects(updatedProjects));
    setEditingProjectIndex(null);
    toast.info('Project record deleted.');
  };

  const saveITSkillItem = (index: number) => {
    const updatedITSkills = [...profile.itSkills];
    updatedITSkills[index] = { ...itSkillForm };
    dispatch(updateITSkills(updatedITSkills));
    setEditingITSkillIndex(null);
    toast.success('IT Skill updated.');
  };

  const deleteITSkillItem = (index: number) => {
    const updatedITSkills = profile.itSkills.filter((_, i) => i !== index);
    dispatch(updateITSkills(updatedITSkills));
    setEditingITSkillIndex(null);
    toast.info('IT Skill removed.');
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
    startEditingHistory,
    startEditingProject,
    startEditingITSkill,
    addNewHistoryItem,
    addNewProjectItem,
    addNewITSkillItem,
    saveHistoryItem,
    deleteHistoryItem,
    saveProjectItem,
    deleteProjectItem,
    saveITSkillItem,
    deleteITSkillItem,
  };
};
