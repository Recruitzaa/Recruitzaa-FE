import {
  LayoutDashboard,
  Calendar,
  IndianRupee,
  MessageSquare,
  Briefcase,
  Kanban,
  Sparkles,
  GraduationCap,
} from 'lucide-react';

export const getInitials = (name?: string) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

export const getRoleLabel = (role?: string) => {
  switch (role) {
    case 'CANDIDATE':
      return 'Job Seeker Account';
    case 'EMPLOYER':
      return 'Employer Account';
    case 'SUPER_ADMIN':
      return 'Admin Account';
    default:
      return 'Account';
  }
};

export const getNavItems = (activeRole: string) => {
  if (activeRole === 'EXPERT') {
    return [
      { label: 'Tutor Dashboard', path: '/expert/dashboard', icon: LayoutDashboard },
      { label: 'Calendar Settings', path: '/expert/calendar-settings', icon: Calendar },
      { label: 'Inbox Messages', path: '/expert/inbox', icon: MessageSquare },
    ];
  }
  if (activeRole === 'EMPLOYEE') {
    return [
      { label: 'Work Dashboard', path: '/employee/dashboard', icon: LayoutDashboard },
      { label: 'Timesheets & Leaves', path: '/employee/timesheets', icon: Calendar },
      { label: 'Payroll & Tax', path: '/employee/payroll', icon: IndianRupee },
      { label: 'Inbox Messages', path: '/employee/inbox', icon: MessageSquare },
    ];
  }
  return [
    { label: 'Overview', path: '/candidate/dashboard', icon: LayoutDashboard },
    { label: 'Verified Job Search', path: '/jobs', icon: Briefcase },
    { label: 'Application Pipeline', path: '/candidate/pipeline', icon: Kanban },
    { label: 'AI Career Hub', path: '/candidate/ai-hub', icon: Sparkles },
    { label: 'Expert Mentors', path: '/candidate/expert-hub', icon: GraduationCap },
    { label: 'Inbox Messages', path: '/candidate/inbox', icon: MessageSquare },
  ];
};
