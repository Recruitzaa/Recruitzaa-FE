import React from 'react';
import { useLocation } from 'react-router-dom';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import { ClipboardList, Calendar, FileText } from 'lucide-react';
import ActiveAllocationCard from './components/ActiveAllocationCard';
import TasksWidget from './components/TasksWidget';
import TimesheetWidget from './components/TimesheetWidget';
import PayrollCard from './components/PayrollCard';

export const EmployeeDashboardPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const renderContent = () => {
    if (path === '/employee/timesheets') {
      return (
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="text-[#c14f16]" size={20} aria-hidden="true" /> Timesheets &
              Leaves Console
            </h1>
            <p className="text-sm text-slate-505 dark:text-slate-400">
              Submit your weekly hour deliverables, review authorization statuses, and track
              remaining leave balances.
            </p>
          </div>
          <TimesheetWidget />
        </div>
      );
    }

    if (path === '/employee/payroll') {
      return (
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="text-[#c14f16]" size={20} aria-hidden="true" /> Payroll, Tax &
              Reimbursements
            </h1>
            <p className="text-sm text-slate-505 dark:text-slate-400">
              View your monthly salary disbursements, download digital payslips, and check pending
              reimbursement pipeline status.
            </p>
          </div>
          <PayrollCard />
        </div>
      );
    }

    // Default: /employee/dashboard (Work Dashboard)
    return (
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <ClipboardList className="text-[#c14f16]" size={20} aria-hidden="true" /> Employee
            Control Room
          </h1>
          <p className="text-sm text-slate-505 dark:text-slate-400">
            Monitor active corporate projects, review shift schedules, and manage your assigned
            tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <ActiveAllocationCard />
          </div>
          <div className="lg:col-span-1">
            <TasksWidget />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <PageTransition>
        <SEO
          title="Employee Control Room | recruitZaa Enterprise"
          description="View active allocations, timesheet progress, leave balances, and payslips."
        />
        <div className="max-w-7xl mx-auto px-4 py-8 w-full">{renderContent()}</div>
      </PageTransition>
    </>
  );
};
export default EmployeeDashboardPage;
