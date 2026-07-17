import { describe, it, expect } from 'vitest';
import reducer, {
  addSkill,
  removeSkill,
  updatePersonalInfo,
  updateEmploymentDetails,
  updateProfessionalSummary,
  updateEmploymentHistory,
} from './profileSlice';

describe('profileSlice Reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toBeDefined();
  });

  it('should handle addSkill', () => {
    const previousState = {
      personalInfo: { firstName: '', lastName: '', email: '', phone: '', location: '', avatar: '' },
      employmentDetails: {
        currentCompany: '',
        currentDesignation: '',
        totalExperience: '',
        currentCTC: '',
        noticePeriod: '',
      },
      professionalSummary: { headline: '', detailedSummary: '' },
      skills: ['React'],
      employmentHistory: [],
      education: { degree: '', university: '', duration: '', type: '' },
      projects: [],
      itSkills: [],
      careerProfile: {
        industry: '',
        department: '',
        roleCategory: '',
        jobRole: '',
        desiredJobType: '',
        desiredEmploymentType: '',
        desiredLocations: [],
        expectedSalary: '',
        preferredShift: '',
      },
      extendedPersonal: {
        gender: '',
        maritalStatus: '',
        dob: '',
        category: '',
        address: '',
        languages: [],
      },
      accomplishments: {
        onlineProfile: '',
        workSample: '',
        publication: '',
        presentation: '',
        patent: '',
        certification: '',
      },
    };

    // Add a new skill
    let state = reducer(previousState, addSkill('TypeScript'));
    expect(state.skills).toEqual(['React', 'TypeScript']);

    // Should not add duplicate skills
    state = reducer(state, addSkill('TypeScript'));
    expect(state.skills).toEqual(['React', 'TypeScript']);
  });

  it('should handle removeSkill', () => {
    const previousState = {
      personalInfo: { firstName: '', lastName: '', email: '', phone: '', location: '', avatar: '' },
      employmentDetails: {
        currentCompany: '',
        currentDesignation: '',
        totalExperience: '',
        currentCTC: '',
        noticePeriod: '',
      },
      professionalSummary: { headline: '', detailedSummary: '' },
      skills: ['React', 'TypeScript'],
      employmentHistory: [],
      education: { degree: '', university: '', duration: '', type: '' },
      projects: [],
      itSkills: [],
      careerProfile: {
        industry: '',
        department: '',
        roleCategory: '',
        jobRole: '',
        desiredJobType: '',
        desiredEmploymentType: '',
        desiredLocations: [],
        expectedSalary: '',
        preferredShift: '',
      },
      extendedPersonal: {
        gender: '',
        maritalStatus: '',
        dob: '',
        category: '',
        address: '',
        languages: [],
      },
      accomplishments: {
        onlineProfile: '',
        workSample: '',
        publication: '',
        presentation: '',
        patent: '',
        certification: '',
      },
    };

    const state = reducer(previousState, removeSkill('React'));
    expect(state.skills).toEqual(['TypeScript']);
  });

  it('should handle updatePersonalInfo', () => {
    const previousState = {
      personalInfo: {
        firstName: 'Arjun',
        lastName: 'Kumar',
        email: '',
        phone: '',
        location: '',
        avatar: '',
      },
      employmentDetails: {
        currentCompany: '',
        currentDesignation: '',
        totalExperience: '',
        currentCTC: '',
        noticePeriod: '',
      },
      professionalSummary: { headline: '', detailedSummary: '' },
      skills: [],
      employmentHistory: [],
      education: { degree: '', university: '', duration: '', type: '' },
      projects: [],
      itSkills: [],
      careerProfile: {
        industry: '',
        department: '',
        roleCategory: '',
        jobRole: '',
        desiredJobType: '',
        desiredEmploymentType: '',
        desiredLocations: [],
        expectedSalary: '',
        preferredShift: '',
      },
      extendedPersonal: {
        gender: '',
        maritalStatus: '',
        dob: '',
        category: '',
        address: '',
        languages: [],
      },
      accomplishments: {
        onlineProfile: '',
        workSample: '',
        publication: '',
        presentation: '',
        patent: '',
        certification: '',
      },
    };

    const state = reducer(
      previousState,
      updatePersonalInfo({ firstName: 'Amit', location: 'Delhi' })
    );
    expect(state.personalInfo.firstName).toBe('Amit');
    expect(state.personalInfo.lastName).toBe('Kumar');
    expect(state.personalInfo.location).toBe('Delhi');
  });

  it('should handle updateEmploymentDetails', () => {
    const previousState = {
      personalInfo: { firstName: '', lastName: '', email: '', phone: '', location: '', avatar: '' },
      employmentDetails: {
        currentCompany: 'Infosys',
        currentDesignation: 'Developer',
        totalExperience: '',
        currentCTC: '',
        noticePeriod: '',
      },
      professionalSummary: { headline: '', detailedSummary: '' },
      skills: [],
      employmentHistory: [],
      education: { degree: '', university: '', duration: '', type: '' },
      projects: [],
      itSkills: [],
      careerProfile: {
        industry: '',
        department: '',
        roleCategory: '',
        jobRole: '',
        desiredJobType: '',
        desiredEmploymentType: '',
        desiredLocations: [],
        expectedSalary: '',
        preferredShift: '',
      },
      extendedPersonal: {
        gender: '',
        maritalStatus: '',
        dob: '',
        category: '',
        address: '',
        languages: [],
      },
      accomplishments: {
        onlineProfile: '',
        workSample: '',
        publication: '',
        presentation: '',
        patent: '',
        certification: '',
      },
    };

    const state = reducer(
      previousState,
      updateEmploymentDetails({ currentCompany: 'TCS', noticePeriod: 'Immediate' })
    );
    expect(state.employmentDetails.currentCompany).toBe('TCS');
    expect(state.employmentDetails.currentDesignation).toBe('Developer');
    expect(state.employmentDetails.noticePeriod).toBe('Immediate');
  });

  it('should handle updateProfessionalSummary', () => {
    const previousState = {
      personalInfo: { firstName: '', lastName: '', email: '', phone: '', location: '', avatar: '' },
      employmentDetails: {
        currentCompany: '',
        currentDesignation: '',
        totalExperience: '',
        currentCTC: '',
        noticePeriod: '',
      },
      professionalSummary: { headline: 'Old Headline', detailedSummary: 'Old Summary' },
      skills: [],
      employmentHistory: [],
      education: { degree: '', university: '', duration: '', type: '' },
      projects: [],
      itSkills: [],
      careerProfile: {
        industry: '',
        department: '',
        roleCategory: '',
        jobRole: '',
        desiredJobType: '',
        desiredEmploymentType: '',
        desiredLocations: [],
        expectedSalary: '',
        preferredShift: '',
      },
      extendedPersonal: {
        gender: '',
        maritalStatus: '',
        dob: '',
        category: '',
        address: '',
        languages: [],
      },
      accomplishments: {
        onlineProfile: '',
        workSample: '',
        publication: '',
        presentation: '',
        patent: '',
        certification: '',
      },
    };

    const state = reducer(previousState, updateProfessionalSummary({ headline: 'New Headline' }));
    expect(state.professionalSummary.headline).toBe('New Headline');
    expect(state.professionalSummary.detailedSummary).toBe('Old Summary');
  });

  it('should handle updateEmploymentHistory', () => {
    const previousState = {
      personalInfo: { firstName: '', lastName: '', email: '', phone: '', location: '', avatar: '' },
      employmentDetails: {
        currentCompany: '',
        currentDesignation: '',
        totalExperience: '',
        currentCTC: '',
        noticePeriod: '',
      },
      professionalSummary: { headline: '', detailedSummary: '' },
      skills: [],
      employmentHistory: [],
      education: { degree: '', university: '', duration: '', type: '' },
      projects: [],
      itSkills: [],
      careerProfile: {
        industry: '',
        department: '',
        roleCategory: '',
        jobRole: '',
        desiredJobType: '',
        desiredEmploymentType: '',
        desiredLocations: [],
        expectedSalary: '',
        preferredShift: '',
      },
      extendedPersonal: {
        gender: '',
        maritalStatus: '',
        dob: '',
        category: '',
        address: '',
        languages: [],
      },
      accomplishments: {
        onlineProfile: '',
        workSample: '',
        publication: '',
        presentation: '',
        patent: '',
        certification: '',
      },
    };

    const newHistory = [
      {
        designation: 'Lead Engineer',
        company: 'Google',
        duration: '2 Years',
        keyResponsibilities: ['Lead Dev'],
      },
    ];
    const state = reducer(previousState, updateEmploymentHistory(newHistory));
    expect(state.employmentHistory).toEqual(newHistory);
  });
});
