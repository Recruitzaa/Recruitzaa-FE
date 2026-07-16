import type { ProfileState } from '../../../../store/slices/profileSlice';

export const getMockParsedProfile = (email: string): ProfileState => ({
  personalInfo: {
    firstName: 'Arjun',
    lastName: 'Kumar',
    email: email || 'arjun.kumar@gmail.com',
    phone: '+91 98765 00122',
    location: 'Bangalore (Hybrid)',
    avatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
  },
  employmentDetails: {
    currentCompany: 'Microsoft Corporation',
    currentDesignation: 'Lead Mobile Frontend Architect',
    totalExperience: '6 Years 5 Months',
    currentCTC: '₹ 32,00,000',
    noticePeriod: 'Immediate (15 days or less)',
  },
  professionalSummary: {
    headline:
      'Lead Mobile Frontend Architect with 6+ years of experience building Teams mobile platforms.',
    detailedSummary:
      'Lead Mobile Frontend Architect with 6+ years of experience building scalable applications. Proven track record in state management, modular rendering optimization, and CI/CD automation.',
  },
  skills: [
    'React Native',
    'TypeScript',
    'Redux Toolkit',
    'GraphQL',
    'Jest',
    'AWS Deployment',
    'Mobile App Profiling',
  ],
  employmentHistory: [
    {
      designation: 'Lead Mobile Frontend Architect',
      company: 'Microsoft Corporation',
      duration: 'Oct 2024 to Present (1 year 9 months)',
      keyResponsibilities: [
        'Architected the next-generation Teams mobile frontend framework.',
        'Reduced application boot time by 35% through code-splitting and dynamic loads.',
      ],
    },
    {
      designation: 'Senior Mobile Engineer',
      company: 'Amazon Web Services',
      duration: 'Jan 2022 to Oct 2024 (2 years 9 months)',
      keyResponsibilities: [
        'Developed offline-first synchronization capabilities for IoT dashboard app.',
      ],
    },
  ],
  education: {
    degree: 'M.Tech / M.E. Computer Science and Engineering',
    university: 'IIT Madras, Chennai',
    duration: '2020-2022',
    type: 'Full Time',
  },
  projects: [
    {
      name: 'CloudSync IoT Client SDK',
      client: 'AWS Platform Group',
      duration: '2023',
      description: 'SDK providing offline sync caches and edge encryption protocols.',
    },
  ],
  itSkills: [
    { skill: 'React Native', version: '0.74', lastUsed: '2026', experience: '4 Years 0 Months' },
    { skill: 'TypeScript', version: '5.2', lastUsed: '2026', experience: '6 Years 0 Months' },
  ],
  careerProfile: {
    industry: 'IT Services & Consulting',
    department: 'Engineering - Software & QA',
    roleCategory: 'Software Development',
    jobRole: 'Lead Frontend Developer',
    desiredJobType: 'Permanent',
    desiredEmploymentType: 'Full Time',
    desiredLocations: ['Bangalore', 'Remote', 'Chennai'],
    expectedSalary: '₹ 34,00,000',
    preferredShift: 'Day Shift',
  },
  extendedPersonal: {
    gender: 'Male',
    maritalStatus: 'Single / Unmarried',
    dob: '05 Mar 2000',
    category: 'General / OBC',
    address: 'No 42, 10th Cross, Indiranagar, Bangalore, Karnataka - 560038',
    languages: ['English', 'Hindi', 'Tamil'],
  },
  accomplishments: {
    onlineProfile: 'https://www.linkedin.com/in/arjun-kumar',
    workSample: 'https://github.com/arjun-kumar-dev',
    publication: 'AI-Driven Automated Test Script Generation - IEEE Paper 2024',
    presentation: 'https://slideshare.net/arjun-kumar/mean-stack-optimizations',
    patent: 'System and Method for Hardware-Backed Encrypted Auth Sessions - Patent Pending',
    certification: 'AWS Certified Solutions Architect – Associate (2025)',
  },
});
