export interface ServiceTier {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
}

export interface ExpertProfile {
  id: string;
  name: string;
  headline: string;
  avatar: string;
  targetCompany: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  serviceTiers: ServiceTier[];
  availability: string[]; // Days of week
}

export const MOCK_EXPERTS: ExpertProfile[] = [
  {
    id: 'exp1',
    name: 'Anjali Sharma',
    headline: 'Senior Engineering Manager at Google | Career Coach',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    targetCompany: 'Google',
    rating: 4.9,
    reviewsCount: 142,
    hourlyRate: 3500,
    availability: ['Monday', 'Wednesday', 'Friday'],
    serviceTiers: [
      {
        id: 'st1_1',
        name: 'Mock System Design Interview',
        description: '45-min mock interview followed by 15-min detailed architectural feedback.',
        durationMinutes: 60,
        price: 3500,
      },
      {
        id: 'st1_2',
        name: 'Resume Review & Refactor',
        description: 'Comprehensive line-by-line critique to pass Big Tech ATS screenings.',
        durationMinutes: 30,
        price: 2000,
      },
    ],
  },
  {
    id: 'exp2',
    name: 'Rohan Deshmukh',
    headline: 'Staff Product Manager at Amazon | Ex-Microsoft',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    targetCompany: 'Amazon',
    rating: 4.8,
    reviewsCount: 96,
    hourlyRate: 3000,
    availability: ['Tuesday', 'Thursday'],
    serviceTiers: [
      {
        id: 'st2_1',
        name: 'Product Strategy & Mock Interview',
        description: 'Practice product sense, metric design, and execution questions.',
        durationMinutes: 60,
        price: 3000,
      },
      {
        id: 'st2_2',
        name: 'Resume & LinkedIn Audit',
        description: 'Optimize your professional positioning and profile copy.',
        durationMinutes: 45,
        price: 1800,
      },
    ],
  },
  {
    id: 'exp3',
    name: 'Kritika Sen',
    headline: 'Lead UX Architect at Microsoft | HCI Mentor',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    targetCompany: 'Microsoft',
    rating: 4.95,
    reviewsCount: 118,
    hourlyRate: 2800,
    availability: ['Wednesday', 'Saturday'],
    serviceTiers: [
      {
        id: 'st3_1',
        name: 'UX Portfolio Critique',
        description:
          'Detailed review of 2 case studies with actionable layout and storytelling improvements.',
        durationMinutes: 60,
        price: 2800,
      },
      {
        id: 'st3_2',
        name: 'App Design Critique Mock Session',
        description: 'Whiteboard design exercise practice matching FAANG loop expectations.',
        durationMinutes: 45,
        price: 2200,
      },
    ],
  },
  {
    id: 'exp4',
    name: 'Vikram Malhotra',
    headline: 'Principal Security Engineer at Uber | Crypto Expert',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    targetCompany: 'Uber',
    rating: 4.75,
    reviewsCount: 74,
    hourlyRate: 4000,
    availability: ['Thursday', 'Sunday'],
    serviceTiers: [
      {
        id: 'st4_1',
        name: 'Security Systems Deep Dive',
        description: 'Discussion on threat modeling, network security, and secure coding patterns.',
        durationMinutes: 60,
        price: 4000,
      },
      {
        id: 'st4_2',
        name: 'FAANG Security Loop Prep',
        description: 'Covers threat scenarios, architecture, and behavioral questions.',
        durationMinutes: 60,
        price: 4000,
      },
    ],
  },
];
