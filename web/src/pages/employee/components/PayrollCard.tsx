import React from 'react';
import { useToast } from '../../../hooks/useToast';
import { FileText, Download, CheckCircle, Clock } from 'lucide-react';

interface Payslip {
  month: string;
  amount: string;
  status: 'Paid' | 'Processing';
  pdfName: string;
}

export const PayrollCard: React.FC = () => {
  const toast = useToast();

  const payslips: Payslip[] = [
    { month: 'June 2026', amount: '₹85,000', status: 'Paid', pdfName: 'payslip_june_2026.pdf' },
    { month: 'May 2026', amount: '₹85,000', status: 'Paid', pdfName: 'payslip_may_2026.pdf' },
    { month: 'April 2026', amount: '₹82,500', status: 'Paid', pdfName: 'payslip_april_2026.pdf' },
  ];

  const handleDownload = (pdfName: string) => {
    toast.success(`Downloaded ${pdfName} successfully!`);
  };

  return (
    <>
      <section
        className="bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4"
        aria-labelledby="payroll-title"
      >
        <div>
          <h2
            id="payroll-title"
            className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2"
          >
            <FileText size={16} className="text-brand-primary" aria-hidden="true" /> Payroll Ledger
            & Payslips
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            View monthly salary payouts and download digital tax compliance receipts.
          </p>
        </div>

        {/* Dense Utility Ledger */}
        <div className="space-y-3 pt-2">
          {payslips.map((slip) => (
            <div
              key={slip.month}
              className="flex items-center justify-between gap-4 p-3 border border-slate-100 dark:border-slate-850 rounded-lg hover:border-brand-primary dark:hover:border-brand-primary transition-all bg-slate-50/20 dark:bg-slate-900/10"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-450 dark:text-slate-500"
                  aria-hidden="true"
                >
                  <FileText size={14} />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
                    {slip.month}
                  </span>
                  <span className="text-sm text-slate-400">
                    {slip.amount} • {slip.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-2 py-0.5 rounded">
                  <CheckCircle size={8} aria-hidden="true" /> Completed
                </span>
                <button
                  type="button"
                  onClick={() => handleDownload(slip.pdfName)}
                  aria-label={`Download payslip pdf for ${slip.month}`}
                  className="p-2 bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 text-slate-550 dark:text-slate-400 hover:text-brand-primary dark:hover:text-brand-primary rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
                >
                  <Download size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reimbursement Pipeline */}
        <div className="pt-4 border-t border-slate-105 dark:border-slate-850 flex items-center justify-between text-sm">
          <span className="font-bold text-slate-650 dark:text-slate-400 flex items-center gap-1">
            <Clock size={11} className="text-amber-500" aria-hidden="true" /> Reimbursement Pipeline
          </span>
          <span className="text-sm text-slate-500">₹4,200 Pending Review</span>
        </div>
      </section>
    </>
  );
};
export default PayrollCard;
