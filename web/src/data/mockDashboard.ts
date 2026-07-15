export interface RecommendedJob {
  id: string;
  role: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
}

export interface ActiveApplication {
  id: string;
  company: string;
  role: string;
  appliedDate: string;
  stageStatus: string;
  stageVariant: 'warning' | 'success' | 'error' | 'primary' | 'neutral';
  nextStep: string;
  isSuccessText?: boolean;
}

export const mockRecommendedJobs: RecommendedJob[] = [
  {
    id: 'rj1',
    role: 'Senior React Native Developer',
    company: 'Infosys Limited',
    location: 'Bangalore (Hybrid)',
    salary: '₹18 – 26 LPA',
    matchScore: 94,
  },
  {
    id: 'rj2',
    role: 'Mobile Application Specialist',
    company: 'Zomato Media',
    location: 'Gurugram (Remote)',
    salary: '₹20 – 30 LPA',
    matchScore: 91,
  },
  {
    id: 'rj3',
    role: 'Lead Mobile Frontend Architect',
    company: 'Flipkart Internet',
    location: 'Bangalore (On-Site)',
    salary: '₹28 – 38 LPA',
    matchScore: 86,
  },
];

export const mockActiveApplications: ActiveApplication[] = [
  {
    id: 'aa1',
    company: 'Infosys Limited',
    role: 'Senior React Native Developer',
    appliedDate: 'Jul 1, 2025',
    stageStatus: 'Interview Round 1',
    stageVariant: 'warning',
    nextStep: 'HR Interview tomorrow at 10:00 AM',
    isSuccessText: false,
  },
  {
    id: 'aa2',
    company: 'Razorpay Technologies',
    role: 'Staff Mobile Engineer',
    appliedDate: 'Jun 20, 2025',
    stageStatus: 'Offer Received',
    stageVariant: 'success',
    nextStep: 'Decision pending (Deadline Jul 20)',
    isSuccessText: true,
  },
];
