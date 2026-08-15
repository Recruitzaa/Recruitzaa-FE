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
import { updateCandidateProfile } from '../../../../services/profile.service';

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
    setHistoryResponsibilitiesText((item.keyResponsibilities || []).join('\n'));
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
      designation: '',
      company: '',
      duration: '',
      keyResponsibilities: [],
    };
    dispatch(updateEmploymentHistory([newItem, ...profile.employmentHistory]));
    startEditingHistory(0);
  };

  const addNewProjectItem = () => {
    const newItem = {
      name: '',
      client: '',
      duration: '',
      description: '',
    };
    dispatch(updateProjects([newItem, ...profile.projects]));
    startEditingProject(0);
  };

  const addNewITSkillItem = () => {
    const newItem = {
      skill: '',
      version: '',
      lastUsed: '',
      experience: '',
    };
    const updated = [...profile.itSkills, newItem];
    dispatch(updateITSkills(updated));
    startEditingITSkill(updated.length - 1);
  };

  const saveHistoryItem = async (index: number) => {
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

    try {
      await updateCandidateProfile({
        experience: updatedHistory.map((h) => ({
          role: h.designation,
          company: h.company,
          startDate: h.duration,
          description: (h.keyResponsibilities || []).join('\n'),
        })),
      } as any);
      toast.success('Employment record saved to database.');
    } catch {
      toast.info('Employment record updated locally.');
    }
  };

  const deleteHistoryItem = async (index: number) => {
    const updatedHistory = profile.employmentHistory.filter((_, i) => i !== index);
    dispatch(updateEmploymentHistory(updatedHistory));
    setEditingHistoryIndex(null);

    try {
      await updateCandidateProfile({
        experience: updatedHistory.map((h) => ({
          role: h.designation,
          company: h.company,
          startDate: h.duration,
          description: (h.keyResponsibilities || []).join('\n'),
        })),
      } as any);
      toast.info('Removed employment record.');
    } catch {
      toast.info('Removed employment record locally.');
    }
  };

  const saveProjectItem = async (index: number) => {
    const updatedProjects = [...profile.projects];
    updatedProjects[index] = { ...projectForm };
    dispatch(updateProjects(updatedProjects));
    setEditingProjectIndex(null);

    try {
      await updateCandidateProfile({
        projects: updatedProjects,
      } as any);
      toast.success('Project details saved to database.');
    } catch {
      toast.info('Project details updated locally.');
    }
  };

  const deleteProjectItem = async (index: number) => {
    const updatedProjects = profile.projects.filter((_, i) => i !== index);
    dispatch(updateProjects(updatedProjects));
    setEditingProjectIndex(null);

    try {
      await updateCandidateProfile({
        projects: updatedProjects,
      } as any);
      toast.info('Project record deleted.');
    } catch {
      toast.info('Project deleted locally.');
    }
  };

  const saveITSkillItem = async (index: number) => {
    const updatedITSkills = [...profile.itSkills];
    updatedITSkills[index] = { ...itSkillForm };
    dispatch(updateITSkills(updatedITSkills));
    setEditingITSkillIndex(null);

    try {
      await updateCandidateProfile({
        itSkills: updatedITSkills,
      } as any);
      toast.success('IT Skill saved to database.');
    } catch {
      toast.info('IT Skill updated locally.');
    }
  };

  const deleteITSkillItem = async (index: number) => {
    const updatedITSkills = profile.itSkills.filter((_, i) => i !== index);
    dispatch(updateITSkills(updatedITSkills));
    setEditingITSkillIndex(null);

    try {
      await updateCandidateProfile({
        itSkills: updatedITSkills,
      } as any);
      toast.info('IT Skill removed.');
    } catch {
      toast.info('IT Skill removed locally.');
    }
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
