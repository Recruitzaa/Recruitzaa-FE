import { useEmployerProfileForm, SECTIONS } from './hooks/useEmployerProfileForm';
import { SEO } from '../../components/seo/SEO';
import { BRAND } from '../../config/content';
import { CompanyHeroCard } from './components/CompanyHeroCard';
import { CompanyOverviewCard } from './components/CompanyOverviewCard';
import { CompanyAboutCard } from './components/CompanyAboutCard';
import { CompanyPerksCard } from './components/CompanyPerksCard';
import { CompanySocialCard } from './components/CompanySocialCard';
import { CompanyPocCard } from './components/CompanyPocCard';

export const EmployerProfilePage = () => {
  const form = useEmployerProfileForm();

  return (
    <>
      <SEO
        title={`Company Profile | ${BRAND.name} Employer`}
        description={`Manage your company branding, culture, and hiring contact on ${BRAND.name}.`}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* LEFT COLUMN: QUICK LINKS */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#131924] rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-5 sticky top-24 hidden lg:block space-y-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider border-b dark:border-slate-800 pb-2">
                Jump To
              </h3>
              <nav className="flex flex-col gap-1 text-sm" aria-label="Profile sections">
                {SECTIONS.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => form.scrollToSection(s.id)}
                    className={`flex items-center w-full text-left px-3 py-2 rounded-lg font-medium transition-all min-h-[44px] focus-visible:outline-2 focus-visible:outline-[#c14f16] focus-visible:outline-offset-[-2px] ${
                      form.activeSection === s.id
                        ? 'text-[#c14f16] bg-[#fef3ee] dark:bg-orange-950/20 font-bold border-l-2 border-[#c14f16]'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 border-l-2 border-transparent'
                    }`}
                    aria-current={form.activeSection === s.id ? 'true' : undefined}
                  >
                    {s.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* RIGHT COLUMN: MAIN CONTENT */}
          <div className="lg:col-span-3 space-y-6">
            <div className="mb-4">
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Company Profile
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage how your company appears to candidates across {BRAND.name}.
              </p>
            </div>

            {/* ── 1. HERO CARD ──────────────────────────────────────────── */}
            <CompanyHeroCard
              profile={form.profile}
              editingSection={form.editingSection}
              startEdit={form.startEdit}
              cancelEdit={form.cancelEdit}
              saveEdit={form.saveEdit}
              field={form.field}
              onLogoUpload={form.handleLogoUpload}
              id={form.id}
            />

            {/* ── 2. OVERVIEW CARD ──────────────────────────────────────── */}
            <CompanyOverviewCard
              profile={form.profile}
              editingSection={form.editingSection}
              startEdit={form.startEdit}
              cancelEdit={form.cancelEdit}
              saveEdit={form.saveEdit}
              field={form.field}
              id={form.id}
            />

            {/* ── 3. ABOUT CARD ─────────────────────────────────────────── */}
            <CompanyAboutCard
              profile={form.profile}
              editingSection={form.editingSection}
              startEdit={form.startEdit}
              cancelEdit={form.cancelEdit}
              saveEdit={form.saveEdit}
              field={form.field}
              id={form.id}
            />

            {/* ── 4. CULTURE & PERKS ────────────────────────────────────── */}
            <CompanyPerksCard
              profile={form.profile}
              editingSection={form.editingSection}
              startEdit={form.startEdit}
              cancelEdit={form.cancelEdit}
              saveEdit={form.saveEdit}
              draft={form.draft}
              newPerk={form.newPerk}
              setNewPerk={form.setNewPerk}
              handleAddPerk={form.handleAddPerk}
              handleRemovePerk={form.handleRemovePerk}
              id={form.id}
            />

            {/* ── 5. SOCIAL LINKS ───────────────────────────────────────── */}
            <CompanySocialCard
              profile={form.profile}
              editingSection={form.editingSection}
              startEdit={form.startEdit}
              cancelEdit={form.cancelEdit}
              saveEdit={form.saveEdit}
              field={form.field}
              id={form.id}
            />

            {/* ── 6. HIRING POC ─────────────────────────────────────────── */}
            <CompanyPocCard
              profile={form.profile}
              editingSection={form.editingSection}
              startEdit={form.startEdit}
              cancelEdit={form.cancelEdit}
              saveEdit={form.saveEdit}
              field={form.field}
              id={form.id}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default EmployerProfilePage;
