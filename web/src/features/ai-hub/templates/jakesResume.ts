import type {
  ProfileState,
  JobHistoryItem,
  ProjectItem,
  ITSkillItem,
} from '../../../store/slices/profileSlice.types';
import { escapeLatex } from './latexUtils';

export const generateJakesResume = (profile: ProfileState): string => {
  const {
    personalInfo,
    professionalSummary,
    skills,
    employmentHistory,
    education,
    projects,
    itSkills,
    accomplishments,
  } = profile;

  const fullName = `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim() || 'Your Name';
  const email = personalInfo.email || '';
  const phone = personalInfo.phone || '';
  const location = personalInfo.location || '';
  const linkedin = accomplishments?.onlineProfile || '';
  const github = accomplishments?.workSample || '';

  const headerParts = [
    phone ? escapeLatex(phone) : '',
    email ? `\\href{mailto:${escapeLatex(email)}}{\\underline{${escapeLatex(email)}}}` : '',
    linkedin ? `\\href{https://${escapeLatex(linkedin)}}{\\underline{${escapeLatex(linkedin)}}}` : '',
    github ? `\\href{https://${escapeLatex(github)}}{\\underline{${escapeLatex(github)}}}` : '',
    location ? escapeLatex(location) : '',
  ].filter(Boolean);

  const skillsList = skills && skills.length > 0 ? skills.map(escapeLatex).join(', ') : '';
  const itSkillsList = itSkills && itSkills.length > 0
    ? itSkills.map((item: ITSkillItem) => `${escapeLatex(item.skill)} (${escapeLatex(item.experience || 'Proficient')})`).join(', ')
    : '';

  // Experience Subheadings
  const experienceLatex = employmentHistory && employmentHistory.length > 0
    ? employmentHistory
        .map((job: JobHistoryItem) => {
          const bullets = job.keyResponsibilities && job.keyResponsibilities.length > 0
            ? job.keyResponsibilities
                .map((resp: string) => `        \\resumeItem{${escapeLatex(resp)}}`)
                .join('\n')
            : '';

          return `    \\resumeSubheading
      {${escapeLatex(job.designation || 'Role')}}{${escapeLatex(job.duration || '')}}
      {${escapeLatex(job.company || 'Company')}}{${escapeLatex(location)}}
      \\resumeItemListStart
${bullets || '        \\resumeItem{Key responsibilities and achievements.}'}
      \\resumeItemListEnd`;
        })
        .join('\n\n')
    : '';

  // Projects Subheadings
  const projectsLatex = projects && projects.length > 0
    ? projects
        .map((proj: ProjectItem) => {
          return `    \\resumeProjectHeading
          {\\textbf{${escapeLatex(proj.name || 'Project')}} $|$ \\emph{${escapeLatex(proj.client || '')}}}{${escapeLatex(proj.duration || '')}}
          \\resumeItemListStart
            \\resumeItem{${escapeLatex(proj.description || '')}}
          \\resumeItemListEnd`;
        })
        .join('\n\n')
    : '';

  // Education Section
  const eduDegree = education?.degree ? escapeLatex(education.degree) : '';
  const eduUni = education?.university ? escapeLatex(education.university) : '';
  const eduDuration = education?.duration ? escapeLatex(education.duration) : '';
  const hasEducation = Boolean(eduDegree || eduUni);

  return `%-------------------------
% Resume in LaTeX — Technical ATS Template
% Author : Jake Gutierrez (Adapted for Recruitzaa)
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${escapeLatex(fullName)}} \\\\ \\vspace{2pt}
    \\small ${headerParts.join(' $|$ ')}
\\end{center}

${
  professionalSummary?.detailedSummary || professionalSummary?.headline
    ? `%-----------SUMMARY-----------
\\section{Professional Summary}
\\small{
  ${escapeLatex(professionalSummary.detailedSummary || professionalSummary.headline || '')}
}
\\vspace{-5pt}`
    : ''
}

${
  hasEducation
    ? `%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {${eduUni}}{${eduDuration}}
      {${eduDegree}}{${escapeLatex(location)}}
  \\resumeSubHeadingListEnd`
    : ''
}

${
  experienceLatex
    ? `%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart

${experienceLatex}

  \\resumeSubHeadingListEnd`
    : ''
}

${
  projectsLatex
    ? `%-----------PROJECTS-----------
\\section{Projects}
    \\resumeSubHeadingListStart

${projectsLatex}

    \\resumeSubHeadingListEnd`
    : ''
}

${
  skillsList || itSkillsList || accomplishments?.certification
    ? `%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     ${skillsList ? `\\textbf{Core Technologies}{: ${skillsList}} \\\\` : ''}
     ${itSkillsList ? `\\textbf{Tools \\& Frameworks}{: ${itSkillsList}} \\\\` : ''}
     ${accomplishments?.certification ? `\\textbf{Certifications}{: ${escapeLatex(accomplishments.certification)}} \\\\` : ''}
    }}
 \\end{itemize}`
    : ''
}

\\end{document}
`;
};
