export interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
}

export interface Thread {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  unread: boolean;
  messages: Message[];
}

export const defaultThreads: Record<string, Thread[]> = {
  CANDIDATE: [
    {
      id: 't1',
      name: 'Sarah Jenkins',
      role: 'Hiring Manager (Employer)',
      lastMessage: 'We reviewed your resume and would love to proceed to a mock interview loop.',
      unread: true,
      messages: [
        {
          id: 'm1',
          sender: 'Sarah',
          text: 'Hi, thanks for applying to the software role.',
          time: '10:00 AM',
        },
        {
          id: 'm2',
          sender: 'Me',
          text: 'Thank you Sarah, I am excited about the opportunity.',
          time: '10:15 AM',
        },
        {
          id: 'm3',
          sender: 'Sarah',
          text: 'We reviewed your resume and would love to proceed to a mock interview loop.',
          time: '10:30 AM',
        },
      ],
    },
    {
      id: 't2',
      name: 'Anjali Sharma',
      role: 'Verified Expert',
      lastMessage: 'Let me know if you want another resume refactor review session.',
      unread: false,
      messages: [
        {
          id: 'm4',
          sender: 'Anjali',
          text: 'Good luck with the prep files I sent over.',
          time: 'Yesterday',
        },
        {
          id: 'm5',
          sender: 'Me',
          text: 'They were incredibly helpful, thank you!',
          time: 'Yesterday',
        },
      ],
    },
  ],
  EMPLOYER: [
    {
      id: 't3',
      name: 'Applicant User',
      role: 'Candidate applicant',
      lastMessage: 'Hi Sarah, I just updated my coding portfolio with the billing streams.',
      unread: true,
      messages: [
        {
          id: 'm6',
          sender: 'Arjun',
          text: 'Hi Sarah, I just updated my coding portfolio with the billing streams.',
          time: '11:00 AM',
        },
      ],
    },
  ],
  EXPERT: [
    {
      id: 't4',
      name: 'Mentee User',
      role: 'Candidate',
      lastMessage: 'Looking forward to our mock interview session tomorrow!',
      unread: true,
      messages: [
        {
          id: 'm7',
          sender: 'Arjun',
          text: 'Looking forward to our mock interview session tomorrow!',
          time: '9:00 AM',
        },
      ],
    },
  ],
};
