interface ProfileQuickLinksProps {
  scrollToSection: (id: string) => void;
}

export const ProfileQuickLinks = ({ scrollToSection }: ProfileQuickLinksProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 sticky top-24 hidden lg:block space-y-4 text-left">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b pb-2">
        Quick links
      </h3>
      <nav className="flex flex-col gap-2.5 text-sm text-slate-600">
        <button
          type="button"
          onClick={() => scrollToSection('resume-upload')}
          className="hover:text-brand-primary flex justify-between items-center py-0.5 font-medium transition-colors w-full text-left bg-transparent border-none cursor-pointer"
        >
          <span>Resume Upload</span>
          <span className="text-sm text-brand-primary font-bold">Update</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('resume-headline')}
          className="hover:text-brand-primary flex justify-between items-center py-0.5 font-medium transition-colors w-full text-left bg-transparent border-none cursor-pointer"
        >
          <span>Resume Headline</span>
          <span className="text-sm text-brand-primary font-bold">Update</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('key-skills')}
          className="hover:text-brand-primary flex justify-between items-center py-0.5 font-medium transition-colors w-full text-left bg-transparent border-none cursor-pointer"
        >
          <span>Key Skills</span>
          <span className="text-sm text-brand-primary font-bold">Add</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('employment')}
          className="hover:text-brand-primary flex justify-between items-center py-0.5 font-medium transition-colors w-full text-left bg-transparent border-none cursor-pointer"
        >
          <span>Employment History</span>
          <span className="text-sm text-brand-primary font-bold">Add</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('it-skills')}
          className="hover:text-brand-primary flex justify-between items-center py-0.5 font-medium transition-colors w-full text-left bg-transparent border-none cursor-pointer"
        >
          <span>IT Skills</span>
          <span className="text-sm text-brand-primary font-bold">Add</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('projects')}
          className="hover:text-brand-primary flex justify-between items-center py-0.5 font-medium transition-colors w-full text-left bg-transparent border-none cursor-pointer"
        >
          <span>Projects</span>
          <span className="text-sm text-brand-primary font-bold">Add</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('education')}
          className="hover:text-brand-primary flex justify-between items-center py-0.5 font-medium transition-colors w-full text-left bg-transparent border-none cursor-pointer"
        >
          <span>Education</span>
          <span className="text-sm text-brand-primary font-bold">Add</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('career-profile')}
          className="hover:text-brand-primary flex justify-between items-center py-0.5 font-medium transition-colors w-full text-left bg-transparent border-none cursor-pointer"
        >
          <span>Career Profile</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('personal-details')}
          className="hover:text-brand-primary flex justify-between items-center py-0.5 font-medium transition-colors w-full text-left bg-transparent border-none cursor-pointer"
        >
          <span>Personal Details</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('accomplishments')}
          className="hover:text-brand-primary flex justify-between items-center py-0.5 font-medium transition-colors w-full text-left bg-transparent border-none cursor-pointer"
        >
          <span>Accomplishments</span>
          <span className="text-sm text-brand-primary font-bold">Add</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('certifications')}
          className="hover:text-brand-primary flex justify-between items-center py-0.5 font-medium transition-colors w-full text-left bg-transparent border-none cursor-pointer"
        >
          <span>Certifications</span>
          <span className="text-sm text-brand-primary font-bold">Add</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('references')}
          className="hover:text-brand-primary flex justify-between items-center py-0.5 font-medium transition-colors w-full text-left bg-transparent border-none cursor-pointer"
        >
          <span>References</span>
          <span className="text-sm text-brand-primary font-bold">Add</span>
        </button>
      </nav>
    </div>
  );
};
