import React from 'react';
import { PageTransition } from '../../../components/layout/PageTransition';
import { SEO } from '../../../components/seo/SEO';
import { BRAND } from '../../../config/content';
import { ShieldAlert, Server, Users, Activity } from 'lucide-react';

export const SuperAdminDashboardPage: React.FC = () => {
  return (
    <>
      <PageTransition>
        <SEO
          title={`Super Admin Workspace | ${BRAND.name} Core`}
          description="Manage site-wide systems, moderate content, and allocate user workspace roles."
        />
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 w-full">
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="text-[#c14f16]" size={20} /> Super Admin Command Center
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Monitor server telemetry logs, approve pending enterprise roles, and moderation flags.
            </p>
          </div>

          {/* Telemetry Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex items-center gap-4">
              <div
                className="p-3.5 bg-red-50 dark:bg-red-950/20 text-red-600 rounded-xl"
                aria-hidden="true"
              >
                <Server size={20} />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-450 uppercase tracking-wider block">
                  System Health
                </span>
                <span className="text-lg font-black text-slate-900 dark:text-white mt-0.5 block">
                  99.98% Uptime
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex items-center gap-4">
              <div className="p-3.5 bg-[#c14f16]/10 text-[#c14f16] rounded-xl" aria-hidden="true">
                <Users size={20} />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-450 uppercase tracking-wider block">
                  Pending Registrations
                </span>
                <span className="text-lg font-black text-slate-900 dark:text-white mt-0.5 block">
                  0 Requests
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex items-center gap-4">
              <div
                className="p-3.5 bg-green-50 dark:bg-green-950/20 text-green-600 rounded-xl"
                aria-hidden="true"
              >
                <Activity size={20} />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-450 uppercase tracking-wider block">
                  Server Load
                </span>
                <span className="text-lg font-black text-slate-900 dark:text-white mt-0.5 block">
                  12.5% CPU Load
                </span>
              </div>
            </div>
          </div>

          {/* Telemetry panel */}
          <div className="bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">
              Moderation Queue
            </h2>
            <div className="text-sm text-slate-500 py-4 text-center">
              All clear! No flag overrides pending.
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};
export default SuperAdminDashboardPage;
