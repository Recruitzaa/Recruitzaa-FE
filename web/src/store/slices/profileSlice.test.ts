import { describe, it, expect } from 'vitest';
import reducer, {
  addSkill,
  removeSkill,
  setFullProfile,
  updateAccomplishments,
  updateCareerProfile,
  updateEducation,
  updateEmploymentDetails,
  updateEmploymentHistory,
  updateExtendedPersonal,
  updateITSkills,
  updatePersonalInfo,
  updateProfessionalSummary,
  updateProjects,
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

  it('handles the remaining profile reducers', () => {
    const baseState = reducer(undefined, { type: 'unknown' });
    const fullProfile = {
      ...baseState,
      personalInfo: { ...baseState.personalInfo, firstName: 'Full' },
    };

    let state = reducer(baseState, setFullProfile(fullProfile));
    expect(state.personalInfo.firstName).toBe('Full');

    state = reducer(
      state,
      updateEducation({
        degree: 'B.Tech',
        university: 'IIT',
        duration: '2018-2022',
        type: 'Full-time',
      })
    );
    state = reducer(
      state,
      updateProjects([
        {
          name: 'Platform',
          client: 'Acme',
          duration: '6 months',
          description: 'Built APIs',
        },
      ])
    );
    state = reducer(
      state,
      updateITSkills([{ skill: 'TypeScript', version: '5', lastUsed: '2026', experience: '3 yrs' }])
    );
    state = reducer(
      state,
      updateCareerProfile({
        ...state.careerProfile,
        industry: 'Technology',
        jobRole: 'Engineer',
      })
    );
    state = reducer(
      state,
      updateExtendedPersonal({
        ...state.extendedPersonal,
        gender: 'Prefer not to say',
      })
    );
    state = reducer(
      state,
      updateAccomplishments({
        ...state.accomplishments,
        certification: 'AWS',
      })
    );

    expect(state.education.degree).toBe('B.Tech');
    expect(state.projects[0]?.name).toBe('Platform');
    expect(state.itSkills[0]?.skill).toBe('TypeScript');
    expect(state.careerProfile.industry).toBe('Technology');
    expect(state.extendedPersonal.gender).toBe('Prefer not to say');
    expect(state.accomplishments.certification).toBe('AWS');
  });
});
