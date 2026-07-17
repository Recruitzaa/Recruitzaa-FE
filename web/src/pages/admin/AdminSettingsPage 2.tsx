import { useState } from 'react';
import { Shield, Key, Bell, Globe, Database, RefreshCw, CheckCircle2, Copy } from 'lucide-react';
import { SEO } from '../../components/seo/SEO';

const MOCK_API_KEY = 'rz_prod_sk_9f2a3b7c4d1e8f6a0b5c2d9e4f7a1b3c';

const SETTINGS = [
  {
    id: 'general',
    label: 'General',
    icon: Globe,
    fields: [
      { label: 'Platform Name', value: 'recruitZaa', type: 'text' },
      { label: 'Support Email', value: 'support@recruitzaa.com', type: 'email' },
      { label: 'Default Language', value: 'en', type: 'text' },
    ],
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    fields: [
      { label: 'Admin Alert Email', value: 'admin@recruitzaa.com', type: 'email' },
      { label: 'System Alert Slack Webhook', value: 'https://hooks.slack.com/...', type: 'text' },
    ],
  },
  {
    id: 'database',
    label: 'Database & Cache',
    icon: Database,
    fields: [
      { label: 'Cache TTL (seconds)', value: '3600', type: 'number' },
      { label: 'Max DB Connections', value: '50', type: 'number' },
    ],
  },
];

export const AdminSettingsPage = () => {
  const [copied, setCopied] = useState(false);
  const [masked, setMasked] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_API_KEY).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO
        title="Settings & API | recruitZaa Admin"
        description="Manage platform configuration, API keys, security settings and system preferences."
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Settings & API</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage platform configuration, API access, and system integrations.
          </p>
        </div>

        {/* API Keys Card */}
        <section className="bg-white dark:bg-[#131924] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-1.5 bg-[#fef3ee] dark:bg-[#c14f16]/20 rounded-lg">
              <Key size={15} className="text-[#c14f16]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">API Credentials</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your production API key for server-to-server integration.
              </p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between gap-3">
                <code className="text-xs font-mono text-slate-700 dark:text-slate-300 break-all flex-1">
                  {masked ? '•'.repeat(MOCK_API_KEY.length) : MOCK_API_KEY}
                </code>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setMasked(!masked)}
                    className="text-[10px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded px-2 py-1 transition-colors"
                  >
                    {masked ? 'Reveal' : 'Hide'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[10px] font-bold text-[#c14f16] border border-[#c14f16]/30 rounded px-2 py-1 hover:bg-[#fef3ee] dark:hover:bg-[#c14f16]/10 transition-colors"
                  >
                    {copied ? <CheckCircle2 size={11} /> : <Copy size={11} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 border border-red-200 dark:border-red-900/40 rounded-lg px-3 py-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <RefreshCw size={11} />
                Regenerate Key
              </button>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                ⚠ Regenerating will immediately invalidate the old key.
              </p>
            </div>
          </div>
        </section>

        {/* Security Card */}
        <section className="bg-white dark:bg-[#131924] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-1.5 bg-[#fef3ee] dark:bg-[#c14f16]/20 rounded-lg">
              <Shield size={15} className="text-[#c14f16]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Security</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Access control and authentication configuration.
              </p>
            </div>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              {
                label: 'Require 2FA for Admin Users',
                desc: 'Force TOTP-based two-factor on all admin accounts',
                enabled: true,
              },
              {
                label: 'IP Allowlist Enforcement',
                desc: 'Only allow admin logins from whitelisted IPs',
                enabled: false,
              },
              {
                label: 'Session Timeout (30 mins)',
                desc: 'Auto-logout idle sessions after 30 minutes',
                enabled: true,
              },
              {
                label: 'Audit Log Retention (90 days)',
                desc: 'Keep system audit logs for 90 days',
                enabled: true,
              },
            ].map((setting) => (
              <div
                key={setting.label}
                className="flex items-center justify-between gap-4 px-6 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {setting.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {setting.desc}
                  </p>
                </div>
                <div
                  className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer shrink-0 ${setting.enabled ? 'bg-[#c14f16]' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${setting.enabled ? 'left-4' : 'left-0.5'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Config Sections */}
        {SETTINGS.map((section) => {
          const Icon = section.icon;
          return (
            <section
              key={section.id}
              className="bg-white dark:bg-[#131924] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                <div className="p-1.5 bg-[#fef3ee] dark:bg-[#c14f16]/20 rounded-lg">
                  <Icon size={15} className="text-[#c14f16]" />
                </div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  {section.label}
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section.fields.map((field) => (
                  <div key={field.label} className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-[#c14f16] transition-colors"
                    />
                  </div>
                ))}
              </div>
              <div className="px-6 pb-5">
                <button
                  type="button"
                  className="text-xs font-bold text-white bg-[#c14f16] hover:bg-[#a94210] px-4 py-2 rounded-lg transition-colors"
                >
                  Save {section.label}
                </button>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
};

export default AdminSettingsPage;
