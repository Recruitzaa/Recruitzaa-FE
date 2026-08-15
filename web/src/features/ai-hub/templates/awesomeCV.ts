import type {
  ProfileState,
  JobHistoryItem,
  ProjectItem,
} from '../../../store/slices/profileSlice.types';
import { escapeLatex } from './latexUtils';

export const generateAwesomeCV = (profile: ProfileState): string => {
  const {
    personalInfo,
    professionalSummary,
    skills,
    employmentHistory,
    education,
    projects,
    accomplishments,
  } = profile;

  const firstName = escapeLatex(personalInfo.firstName || 'First');
  const lastName = escapeLatex(personalInfo.lastName || 'Last');
  const email = escapeLatex(personalInfo.email || '');
  const phone = escapeLatex(personalInfo.phone || '');
  const location = escapeLatex(personalInfo.location || '');
  const headline = escapeLatex(professionalSummary?.headline || '');

  const experienceItems = employmentHistory && employmentHistory.length > 0
    ? employmentHistory
        .map((job: JobHistoryItem) => {
          const bullets = job.keyResponsibilities && job.keyResponsibilities.length > 0
            ? job.keyResponsibilities
                .map((resp: string) => `      \\item {${escapeLatex(resp)}}`)
                .join('\n')
            : '';

          return `  \\cventry
    {${escapeLatex(job.designation || '')}} % Job title
    {${escapeLatex(job.company || '')}} % Organization
    {${location}} % Location
    {${escapeLatex(job.duration || '')}} % Date(s)
    {
${bullets ? `      \\begin{cvitems}\n${bullets}\n      \\end{cvitems}` : ''}
    }`;
        })
        .join('\n\n')
    : '';

  const projectsItems = projects && projects.length > 0
    ? projects
        .map((p: ProjectItem) => {
          return `  \\cventry
    {${escapeLatex(p.client || '')}}
    {${escapeLatex(p.name)}}
    {}
    {${escapeLatex(p.duration || '')}}
    {
      \\begin{cvitems}
        \\item {${escapeLatex(p.description || '')}}
      \\end{cvitems}
    }`;
        })
        .join('\n\n')
    : '';

  const hasEdu = Boolean(education?.degree || education?.university);

  return `%-------------------------
% Awesome CV LaTeX Template
% Author: Claud D. Park (Adapted for Recruitzaa)
% License: CC BY-SA 4.0
%------------------------

\\documentclass[11pt, a4paper]{awesome-cv}

\\geometry{left=1.4cm, top=.8cm, right=1.4cm, bottom=1.8cm, footskip=.5cm}

\\colorlet{awesome}{awesome-emerald}

\\setbool{acvSectionColorHighlight}{true}

% Personal Information
\\name{${firstName}}{${lastName}}
${headline ? `\\position{${headline}}` : ''}
${location ? `\\address{${location}}` : ''}
${phone ? `\\mobile{${phone}}` : ''}
${email ? `\\email{${email}}` : ''}
${accomplishments?.onlineProfile ? `\\linkedin{${escapeLatex(accomplishments.onlineProfile)}}` : ''}
${accomplishments?.workSample ? `\\github{${escapeLatex(accomplishments.workSample)}}` : ''}

\\begin{document}

\\makecvheader[C]

${
  professionalSummary?.detailedSummary
    ? `\\cvsection{Summary}
\\begin{cvparagraph}
${escapeLatex(professionalSummary.detailedSummary)}
\\end{cvparagraph}`
    : ''
}

${
  skills && skills.length > 0
    ? `\\cvsection{Skills}
\\begin{cvskills}
  \\cvskill{Technical Competencies}{${skills.map(escapeLatex).join(', ')}}
\\end{cvskills}`
    : ''
}

${
  experienceItems
    ? `\\cvsection{Experience}
\\begin{cventries}
${experienceItems}
\\end{cventries}`
    : ''
}

${
  projectsItems
    ? `\\cvsection{Projects}
\\begin{cventries}
${projectsItems}
\\end{cventries}`
    : ''
}

${
  hasEdu
    ? `\\cvsection{Education}
\\begin{cventries}
  \\cventry
    {${escapeLatex(education?.degree || '')}}
    {${escapeLatex(education?.university || '')}}
    {${location}}
    {${escapeLatex(education?.duration || '')}}
    {}
\\end{cventries}`
    : ''
}

\\end{document}
`;
};
