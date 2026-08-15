import type {
  ProfileState,
  JobHistoryItem,
  ProjectItem,
} from '../../../store/slices/profileSlice.types';
import { escapeLatex } from './latexUtils';

export const generateMinimalistCV = (profile: ProfileState): string => {
  const {
    personalInfo,
    professionalSummary,
    skills,
    employmentHistory,
    education,
    projects,
    accomplishments,
  } = profile;

  const fullName =
    `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim() || 'Your Name';
  const email = personalInfo.email || '';
  const phone = personalInfo.phone || '';
  const location = personalInfo.location || '';
  const linkedin = accomplishments?.onlineProfile || '';

  const headerContact = [
    location ? escapeLatex(location) : '',
    phone ? escapeLatex(phone) : '',
    email ? `\\href{mailto:${escapeLatex(email)}}{${escapeLatex(email)}}` : '',
    linkedin ? `\\href{https://${escapeLatex(linkedin)}}{${escapeLatex(linkedin)}}` : '',
  ]
    .filter(Boolean)
    .join(' $|$ ');

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

            return `\\noindent \\textbf{${escapeLatex(job.company || '')}} \\hfill ${escapeLatex(job.duration || '')} \\\\
\\textit{${escapeLatex(job.designation || '')}} \\hfill \\textit{${escapeLatex(location)}}
${bullets ? `\\begin{itemize}[leftmargin=*,noitemsep,topsep=2pt]\n${bullets}\n\\end{itemize}` : ''}
\\vspace{6pt}`;
          })
          .join('\n\n')
      : '';

  const educationItems =
    education && education.length > 0
      ? education
          .map((edu) => {
            return `\\noindent \\textbf{${escapeLatex(edu.university || '')}} \\hfill ${escapeLatex(edu.duration || '')} \\\\
\\textit{${escapeLatex(edu.degree || '')}} \\hfill \\textit{${escapeLatex(location)}}`;
          })
          .join('\n\\vspace{4pt}\n')
      : '';

  return `%-------------------------
% Minimalist Academic/Executive CV
% Clean & Direct Single-Column Template
%------------------------

\\documentclass[10pt,letterpaper]{article}
\\usepackage[margin=0.7in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage[T1]{fontenc}
\\usepackage{lmodern}

\\pagestyle{empty}

\\begin{document}

% Header
\\begin{center}
  {\\LARGE \\textbf{${escapeLatex(fullName)}}} \\\\[4pt]
  ${headerContact ? `\\small ${headerContact}` : ''}
\\end{center}

\\vspace{4pt}
\\hrule
\\vspace{6pt}

${
  professionalSummary?.detailedSummary
    ? `\\noindent \\textbf{\\large Summary} \\\\[3pt]
${escapeLatex(professionalSummary.detailedSummary)}
\\vspace{8pt}`
    : ''
}

${
  experienceItems
    ? `\\noindent \\textbf{\\large Experience} \\\\[4pt]
${experienceItems}`
    : ''
}

${
  educationItems
    ? `\\noindent \\textbf{\\large Education} \\\\[4pt]
${educationItems}
\\vspace{8pt}`
    : ''
}

${
  skills && skills.length > 0
    ? `\\noindent \\textbf{\\large Skills \\& Competencies} \\\\[4pt]
${skills.map(escapeLatex).join(' $\\cdot$ ')}
\\vspace{8pt}`
    : ''
}

${
  projects && projects.length > 0
    ? `\\noindent \\textbf{\\large Key Projects} \\\\[4pt]
${projects.map((p: ProjectItem) => `\\noindent \\textbf{${escapeLatex(p.name)}} (${escapeLatex(p.duration || '')}) --- ${escapeLatex(p.description || '')}`).join('\\\\\n')}`
    : ''
}

\\end{document}
`;
};
