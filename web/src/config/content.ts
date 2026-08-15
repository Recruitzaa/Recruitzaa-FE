export const BRAND = {
  name: 'Recruitzaa',
  legalName: 'Recruitzaa Technologies Pvt. Ltd.',
  supportEmail: 'support@recruitzaa.com',
  privacyEmail: 'privacy@recruitzaa.com',
} as const;

export const SITE_CONTENT = {
  contact: {
    phone: '+91 8431185984',
    email: 'talent@recruitzaa.com',
  },
  company: {
    name: 'Recruitzaa Technologies Pvt. Ltd.',
    locations: 'Bangalore · Hyderabad · Mumbai · Delhi NCR',
  },
  landingPage: {
    hero: {
      badge: 'Recruitment Workspace',
      titleHighlight: 'Move forward.',
      titlePrefix: 'Find your role. Build your team. ',
      subtitle:
        'Recruitzaa brings job search, application tracking, and hiring tools into a single, unified workspace for candidates and employers.',
      metrics: [
        { value: '2,100+', label: 'Active jobs' },
        { value: '350+', label: 'Verified employers' },
        { value: '3 min', label: 'Avg. apply time' },
      ],
    },
    featuredJobs: [
      {
        title: 'Senior React Native Engineer',
        meta: 'Infosys Limited · Bangalore · Full-Time',
        match: 'View role',
      },
      {
        title: 'Mobile App Specialist (iOS / React)',
        meta: 'Zomato · Gurugram · Hybrid',
        match: 'View role',
      },
      {
        title: 'Lead Frontend Architect',
        meta: 'Flipkart · Bangalore · Remote',
        match: 'View role',
      },
    ],
    portals: {
      seekers: {
        title: 'For Job Seekers',
        description:
          'Browse roles by title, location, workplace, and experience. Use the candidate workspace to organize profile and application information.',
        bullets: [
          'Instantly build and score your resume with built-in AI tools',
          'Structured application tracking board',
          'Role, location, and workplace filters',
        ],
        cta: 'Find Matching Roles',
      },
      employers: {
        title: 'For Enterprise Employers',
        description:
          'Create roles and organize candidate review in a structured employer workspace. Production sourcing and screening depend on approved integrations.',
        bullets: [
          'Structured candidate review and shortlisting',
          'Centralized job and candidate management',
          'Role-based employer workspaces',
        ],
        cta: 'Start Hiring Talent',
      },
    },
    services: [
      {
        num: '01',
        title: 'Permanent Placement',
        desc: 'Full-cycle hiring support for permanent engineering, product, and leadership roles.',
      },
      {
        num: '02',
        title: 'Contract Staffing',
        desc: 'On-demand technical contractors for project-based or flexible staffing needs.',
      },
      {
        num: '03',
        title: 'Executive Search',
        desc: 'Confidential, headhunting services for VP, Director, and C-level executive talent acquisition.',
      },
      {
        num: '04',
        title: 'Structured Profile Review',
        desc: 'Structured profile comparison designed to help recruiters review role requirements consistently.',
      },
    ],
    faqs: [
      {
        q: "How does Recruitzaa's AI candidate matching work?",
        a: 'Recruitzaa compares your profile skills and preferences with job attributes to surface relevant roles. Scores are based on keyword overlap — they guide discovery, not hiring decisions, which always remain with employers.',
      },
      {
        q: 'Is Recruitzaa free for job seekers?',
        a: 'Recruitzaa is completely free for job seekers. Employer and enterprise subscription options are available on request.',
      },
      {
        q: 'How do I optimize my resume for ATS on Recruitzaa?',
        a: 'Use the AI Career Tools tab to compare your resume against a job description. It highlights keyword gaps and suggests improvements — treat results as guidance to sharpen your application.',
      },
      {
        q: 'What industries and locations do you cover?',
        a: 'Coverage depends on the roles employers publish. Use the job catalogue filters to see what is currently represented.',
      },
      {
        q: 'How quickly can employers hire through Recruitzaa?',
        a: 'Hiring timelines depend on your team\u2019s process and the role. Recruitzaa consolidates sourcing, screening, and review steps to reduce coordination delays — actual time-to-hire will vary.',
      },
    ],
    aboutUs: {
      tag: 'Who We Are',
      title: 'Redefining the Recruitment Paradigm',
      subtitle:
        'Recruitzaa is a shared workspace for candidates, employers, experts, employees, and platform operators.',
      differentiators: [
        {
          title: 'Explainable AI Match Scoring',
          desc: 'Profile comparisons show which job attributes contributed to your score — final decisions always stay with you.',
        },
        {
          title: 'Clear Listing Sources',
          desc: 'Every listing shows its verified employer source, posted date, and salary range.',
        },
        {
          title: 'Privacy by Design',
          desc: 'Collect only the candidate and employer data needed for the workflow, with clear access controls and retention policies.',
        },
      ],
    },
  },
  employerLandingPage: {
    hero: {
      title: 'A structured workspace for hiring teams',
      subtitle:
        'Recruitzaa helps enterprise teams hire with structured sourcing, verified talent, and a review-first workflow that keeps quality high.',
      cta: 'Start Hiring',
    },
    stats: [
      { value: 'Create', label: 'Job listings' },
      { value: 'Review', label: 'Candidates' },
      { value: 'Track', label: 'Hiring stages' },
    ],
    services: [
      {
        title: 'Contract Staffing',
        desc: 'A workflow for discussing flexible, project-based staffing requirements.',
      },
      {
        title: 'Permanent Placement',
        desc: 'End-to-end executive search and contingency recruitment for full-time roles.',
      },
      {
        title: 'RPO Solutions',
        desc: 'Recruitment Process Outsourcing: We act as your internal talent acquisition team.',
      },
      {
        title: 'Payroll Management',
        desc: 'Integrated payroll operations for contract and permanent hires, including disbursement tracking and compliance reporting.',
      },
    ],
    stepsHeading: 'Three steps to start hiring',
    steps: [
      { number: '1', title: 'Register your company' },
      { number: '2', title: 'Create and publish a job listing' },
      { number: '3', title: 'Review matched candidate profiles' },
    ],
  },
};
