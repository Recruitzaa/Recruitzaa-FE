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
      badge: 'Recruitment workspace',
      titleHighlight: 'move forward.',
      titlePrefix: 'Find work. Build teams. ',
      subtitle:
        'Recruitzaa brings job discovery and structured hiring workflows into one clear workspace for candidates and employers.',
      metrics: [
        { value: 'Search', label: 'Current roles' },
        { value: 'Track', label: 'Applications' },
        { value: 'Manage', label: 'Hiring workflows' },
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
          'Profile and resume tools in one workspace',
          'Structured application tracking board',
          'Role, location, and workplace filters',
        ],
        cta: 'Explore All Jobs',
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
        desc: 'A structured engagement for discussing permanent engineering, product, and leadership hiring needs.',
      },
      {
        num: '02',
        title: 'Contract Staffing',
        desc: 'A workflow for discussing technical contractors for project-based or changing staffing needs.',
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
        a: 'The current demo compares profile skills and preferences with job attributes. Production scoring requires validated models, clear explanations, and human review.',
      },
      {
        q: 'Is Recruitzaa free for job seekers?',
        a: 'The demo does not publish pricing commitments. Candidate pricing and feature availability should be confirmed before launch.',
      },
      {
        q: 'How do I optimize my resume for ATS on Recruitzaa?',
        a: 'The Career Tools workspace is designed to compare resume content with a job description. Treat its suggestions as guidance, not a hiring decision.',
      },
      {
        q: 'What industries and locations do you cover?',
        a: 'Coverage depends on the roles employers publish. Use the job catalogue filters to see what is currently represented.',
      },
      {
        q: 'How quickly can employers hire through Recruitzaa?',
        a: 'Hiring time varies by role and process. Recruitzaa is designed to centralize review steps; no time-to-hire outcome is guaranteed.',
      },
    ],
    aboutUs: {
      tag: 'Who We Are',
      title: 'Redefining the Recruitment Paradigm',
      subtitle:
        'Recruitzaa is being designed as a shared workspace for candidates, employers, experts, employees, and platform operators.',
      differentiators: [
        {
          title: 'Explainable AI Match Scoring',
          desc: 'Profile comparisons should show which job attributes contributed to a score and always leave the decision with a person.',
        },
        {
          title: 'Clear Listing Sources',
          desc: 'Production listings should identify their employer or approved source and display a reliable posted and closing date.',
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
        desc: 'A planned workspace for payroll operations; availability depends on production integrations and jurisdictional review.',
      },
    ],
    steps: [
      { number: '1', title: 'Register your company' },
      { number: '2', title: 'Create and review a job listing' },
      { number: '3', title: 'Review candidate profiles' },
    ],
  },
};
