import type {
  ProfileState,
  JobHistoryItem,
  ProjectItem,
} from '../../../store/slices/profileSlice.types';
import { escapeLatex } from './latexUtils';

export const generateDeedyCV = (profile: ProfileState): string => {
  const { personalInfo, professionalSummary, skills, employmentHistory, education, projects } =
    profile;

  const firstName = escapeLatex(personalInfo.firstName || 'First');
  const lastName = escapeLatex(personalInfo.lastName || 'Last');
  const email = escapeLatex(personalInfo.email || '');
  const phone = escapeLatex(personalInfo.phone || '');
  const location = escapeLatex(personalInfo.location || '');
  const headline = escapeLatex(professionalSummary?.headline || '');

  const skillsList =
    skills && skills.length > 0
      ? skills.map((s: string) => `\\textbullet{} ${escapeLatex(s)}`).join(' \\\\ \n')
      : '';

  const experienceItems =
    employmentHistory && employmentHistory.length > 0
      ? employmentHistory
          .map((job: JobHistoryItem) => {
            const bullets =
              job.keyResponsibilities && job.keyResponsibilities.length > 0
                ? job.keyResponsibilities
                    .map((resp: string) => `\\item ${escapeLatex(resp)}`)
                    .join('\n')
                : '';

            return `\\runsubsection{${escapeLatex(job.company || '')}}
\\descript{| ${escapeLatex(job.designation || '')}}
\\location{${escapeLatex(job.duration || '')} | ${location}}
\\vspace{\\topsep}
${bullets ? `\\begin{tightemize}\n${bullets}\n\\end{tightemize}` : ''}
\\sectionsep`;
          })
          .join('\n\n')
      : '';

  const projectsItems =
    projects && projects.length > 0
      ? projects
          .map((p: ProjectItem) => {
            return `\\runsubsection{${escapeLatex(p.name)}}
\\descript{| ${escapeLatex(p.client || '')}}
\\location{${escapeLatex(p.duration || '')}}
\\begin{tightemize}
\\item ${escapeLatex(p.description || '')}
\\end{tightemize}
\\sectionsep`;
          })
          .join('\n\n')
      : '';

  const educationItems =
    education && education.length > 0
      ? education
          .map((edu) => {
            return `\\subsection{${escapeLatex(edu.university || '')}}
\\descript{${escapeLatex(edu.degree || '')}}
\\location{${escapeLatex(edu.duration || '')}}`;
          })
          .join('\n')
      : '';

  return `%-------------------------
% Deedy - Two Column Resume
% Author: Debarghya Das (Adapted for Recruitzaa)
% License: CC BY 3.0
%------------------------

\\documentclass[]{deedy-resume-openfont}
\\usepackage{fancyhdr}
 
\\pagestyle{fancy}
\\fancyhf{}
 
\\begin{document}

\\namesection{${firstName}}{${lastName}}{ \\urlstyle{same}${email ? `\\href{mailto:${email}}{${email}}` : ''}${phone ? ` | ${phone}` : ''}${location ? ` | ${location}` : ''} \\\\
${headline}
}

\\begin{minipage}[t]{0.33\\textwidth} 

${
  educationItems
    ? `\\section{Education}
${educationItems}
\\sectionsep`
    : ''
}

${
  skillsList
    ? `\\section{Skills}
\\subsection{Programming \\& Tools}
${skillsList}
\\sectionsep`
    : ''
}

\\end{minipage} 
\\hfill
\\begin{minipage}[t]{0.66\\textwidth} 

${
  professionalSummary?.detailedSummary
    ? `\\section{Summary}
${escapeLatex(professionalSummary.detailedSummary)}
\\sectionsep`
    : ''
}

${
  experienceItems
    ? `\\section{Experience}
${experienceItems}`
    : ''
}

${
  projectsItems
    ? `\\section{Projects}
${projectsItems}`
    : ''
}

\\end{minipage} 
\\end{document}
`;
};
