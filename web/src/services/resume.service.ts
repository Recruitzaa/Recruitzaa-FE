import api from '../lib/axios';

export interface ResumeTemplate {
  id: string;
  name: string;
  category: string;
  tag: string;
  description: string;
  accentColor: string;
}

export interface GeneratedLatexResponse {
  templateId: string;
  templateName: string;
  latexCode: string;
  suggestedFilename: string;
}

export interface SavedResume {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  latexCode: string;
  createdAt: string;
  updatedAt: string;
}

export const ResumeApiService = {
  /**
   * Fetch list of LaTeX CV templates from backend.
   */
  async getTemplates(): Promise<ResumeTemplate[]> {
    const res = await api.get<{ success: boolean; data: ResumeTemplate[] }>('/resume/templates');
    return res.data.data;
  },

  /**
   * Generate LaTeX source code on backend.
   */
  async generateLatex(templateId: string, customProfile?: any): Promise<GeneratedLatexResponse> {
    const res = await api.post<{ success: boolean; data: GeneratedLatexResponse }>('/resume/latex/generate', {
      templateId,
      customProfile,
    });
    return res.data.data;
  },

  /**
   * Save a customized LaTeX resume version for the candidate.
   */
  async saveResume(title: string, templateId: string, latexCode: string): Promise<SavedResume> {
    const res = await api.post<{ success: boolean; data: SavedResume }>('/resume/save', {
      title,
      templateId,
      latexCode,
    });
    return res.data.data;
  },

  /**
   * Get all saved resumes for the candidate.
   */
  async getMyResumes(): Promise<SavedResume[]> {
    const res = await api.get<{ success: boolean; data: SavedResume[] }>('/resume/my-resumes');
    return res.data.data;
  },

  /**
   * Delete a saved resume.
   */
  async deleteResume(resumeId: string): Promise<void> {
    await api.delete(`/resume/${resumeId}`);
  },
};
