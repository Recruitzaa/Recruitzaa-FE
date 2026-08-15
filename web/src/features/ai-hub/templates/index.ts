import type { ProfileState } from '../../../store/slices/profileSlice.types';
import { generateJakesResume } from './jakesResume';
import { generateModernCV } from './modernCV';
import { generateDeedyCV } from './deedyCV';
import { generateAwesomeCV } from './awesomeCV';
import { generateMinimalistCV } from './minimalistCV';

export interface LatexTemplateMeta {
  id: string;
  name: string;
  category: string;
  tag: string;
  description: string;
  accentColor: string;
  generator: (profile: ProfileState) => string;
}

export const LATEX_TEMPLATES: LatexTemplateMeta[] = [
  {
    id: 'jakes-resume',
    name: "Jake's Resume",
    category: 'Software Engineering',
    tag: 'ATS Gold Standard',
    description: 'The #1 most popular 1-page tech resume format. Highly optimized for ATS parsers and technical hiring managers.',
    accentColor: '#2563eb', // Blue
    generator: generateJakesResume,
  },
  {
    id: 'modern-cv',
    name: 'ModernCV Classic',
    category: 'Corporate & Product',
    tag: 'Executive & Clean',
    description: 'Elegant corporate standard with distinctive icon badges and structured experience sections.',
    accentColor: '#0284c7', // Sky
    generator: generateModernCV,
  },
  {
    id: 'deedy-cv',
    name: 'Deedy CV (2-Column)',
    category: 'Data Science & Research',
    tag: 'High Density 2-Col',
    description: 'Two-column compact resume designed by Debarghya Das. Ideal for engineers with extensive project portfolios.',
    accentColor: '#7c3aed', // Purple
    generator: generateDeedyCV,
  },
  {
    id: 'awesome-cv',
    name: 'Awesome CV',
    category: 'Senior & Staff Engineers',
    tag: 'Modern Typography',
    description: 'Award-winning LaTeX template with beautiful font pairings, colorful headers, and crisp bullet alignments.',
    accentColor: '#059669', // Emerald
    generator: generateAwesomeCV,
  },
  {
    id: 'minimalist-cv',
    name: 'Minimalist Single Column',
    category: 'Management & General',
    tag: 'ATS Direct',
    description: 'Distraction-free classic layout with timeless typography. Perfect for product managers, finance, and operations.',
    accentColor: '#475569', // Slate
    generator: generateMinimalistCV,
  },
];

export const getTemplateById = (id: string): LatexTemplateMeta => {
  return LATEX_TEMPLATES.find((t) => t.id === id) || LATEX_TEMPLATES[0];
};

export const generateLatex = (templateId: string, profile: ProfileState): string => {
  const template = getTemplateById(templateId);
  return template.generator(profile);
};
