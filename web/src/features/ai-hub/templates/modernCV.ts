import type {
  ProfileState,
  JobHistoryItem,
  ProjectItem,
} from '../../../store/slices/profileSlice.types';
import { escapeLatex } from './latexUtils';

export const generateModernCV = (profile: ProfileState): string => {
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

  const skillsList = skills && skills.length > 0 ? skills.map(escapeLatex).join(', ') : '';

  const experienceItems =
    employmentHistory && employmentHistory.length > 0
      ? employmentHistory
          .map((job: JobHistoryItem) => {
            const bullets =
              job.keyResponsibilities && job.keyResponsibilities.length > 0
                ? job.keyResponsibilities
                    .map((resp: string) => `  \\item ${escapeLatex(resp)}`)
                    .join('\n')
                : '';

            return `\\cventry{${escapeLatex(job.duration || '')}}{${escapeLatex(job.designation || '')}}{${escapeLatex(job.company || '')}}{${location}}{}{
${bullets ? `\\begin{itemize}\n${bullets}\n\\end{itemize}` : ''}
}`;
          })
          .join('\n\n')
      : '';

  const projectsItems =
    projects && projects.length > 0
      ? projects
          .map((p: ProjectItem) => {
            return `\\cventry{${escapeLatex(p.duration || '')}}{${escapeLatex(p.name)}}{${escapeLatex(p.client || '')}}{}{}{${escapeLatex(p.description || '')}}`;
          })
          .join('\n')
      : '';

  const educationItems =
    education && education.length > 0
      ? education
          .map((edu) => {
            return `\\cventry{${escapeLatex(edu.duration || '')}}{${escapeLatex(edu.degree || '')}}{${escapeLatex(edu.university || '')}}{${location}}{}{}`;
          })
          .join('\n')
      : '';

  return `%-------------------------
% ModernCV LaTeX Template
% Author : Xavier Danaux (Adapted for Recruitzaa)
% License : LaTeX Project Public License
%------------------------

\\documentclass[11pt,a4paper,sans]{moderncv}

% moderncv themes
\\moderncvstyle{classic}
\\moderncvcolor{blue}

% adjust the page margins
\\usepackage[scale=0.82]{geometry}
\\usepackage{multicol}

% personal data
\\name{${firstName}}{${lastName}}
${headline ? `\\title{${headline}}` : ''}
${location ? `\\address{${location}}{}{}` : ''}
${phone ? `\\phone[mobile]{${phone}}` : ''}
${email ? `\\email{${email}}` : ''}
${accomplishments?.onlineProfile ? `\\social[linkedin]{${escapeLatex(accomplishments.onlineProfile)}}` : ''}
${accomplishments?.workSample ? `\\social[github]{${escapeLatex(accomplishments.workSample)}}` : ''}

\\begin{document}
\\makecvtitle

${
  professionalSummary?.detailedSummary
    ? `\\section{Professional Profile}
${escapeLatex(professionalSummary.detailedSummary)}
\\vspace{1em}`
    : ''
}

${
  experienceItems
    ? `\\section{Experience}
${experienceItems}`
    : ''
}

${
  educationItems
    ? `\\section{Education}
${educationItems}`
    : ''
}

${
  skillsList
    ? `\\section{Technical Skills}
\\cvitem{Skills}{${skillsList}}`
    : ''
}

${
  projectsItems
    ? `\\section{Projects}
${projectsItems}`
    : ''
}

\\end{document}
`;
};
