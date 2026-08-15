import { Plus, Edit2 } from 'lucide-react';
import { useId } from 'react';
import type { ProjectItem } from '../../../../store/slices/profileSlice';

interface ProjectsCardProps {
  projects: ProjectItem[];
  editingProjectId: string | null;
  cancelProjectEditing: () => void;
  startEditingProject: (id: string) => void;
  projectForm: ProjectItem;
  setProjectForm: (form: ProjectItem) => void;
  projectErrors: Record<string, string>;
  saveProjectItem: (id: string) => void;
  deleteProjectItem: (id: string) => void;
  addNewProjectItem: () => void;
}

export const ProjectsCard = ({
  projects,
  editingProjectId,
  cancelProjectEditing,
  startEditingProject,
  projectForm,
  setProjectForm,
  projectErrors,
  saveProjectItem,
  deleteProjectItem,
  addNewProjectItem,
}: ProjectsCardProps) => {
  const idPrefix = useId();

  return (
    <div
      id="projects"
      className="bg-white dark:bg-slate-850 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4 scroll-mt-24"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-brand-charcoal">Projects</h3>
        <button
          type="button"
          onClick={addNewProjectItem}
          className="flex items-center gap-1 text-sm text-brand-primary hover:text-brand-primary-hover font-bold"
        >
          <Plus size={14} /> Add Project
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((proj) => {
          const nameId = `${idPrefix}-proj-name-${proj.id}`;
          const clientId = `${idPrefix}-proj-client-${proj.id}`;
          const durationId = `${idPrefix}-proj-duration-${proj.id}`;
          const descriptionId = `${idPrefix}-proj-description-${proj.id}`;

          return (
            <div
              key={proj.id}
              className="relative border-l-2 border-brand-primary/40 pl-4 space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {proj.name}
                  </h4>
                  <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                    {proj.client} <span aria-hidden="true">&bull;</span>{' '}
                    <span className="font-normal text-slate-400 dark:text-slate-500">
                      {proj.duration}
                    </span>
                  </div>
                </div>
                {editingProjectId !== proj.id && (
                  <button
                    type="button"
                    onClick={() => startEditingProject(proj.id)}
                    className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-brand-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    aria-label={`Edit ${proj.name}`}
                  >
                    <Edit2 size={14} />
                  </button>
                )}
              </div>

              {editingProjectId !== proj.id ? (
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {proj.description}
                </p>
              ) : (
                <div className="bg-slate-50 dark:bg-brand-card p-4 rounded border border-slate-200 dark:border-slate-700 space-y-3 mt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label
                        htmlFor={nameId}
                        className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                      >
                        Project Name
                      </label>
                      <input
                        id={nameId}
                        type="text"
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                        className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        aria-invalid={Boolean(projectErrors.name)}
                      />
                      {projectErrors.name && (
                        <p className="text-xs text-red-600 dark:text-red-400">
                          {projectErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor={clientId}
                        className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                      >
                        Client
                      </label>
                      <input
                        id={clientId}
                        type="text"
                        value={projectForm.client}
                        onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                        className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label
                        htmlFor={durationId}
                        className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                      >
                        Duration
                      </label>
                      <input
                        id={durationId}
                        type="text"
                        value={projectForm.duration}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, duration: e.target.value })
                        }
                        className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label
                        htmlFor={descriptionId}
                        className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                      >
                        Description
                      </label>
                      <textarea
                        id={descriptionId}
                        value={projectForm.description}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, description: e.target.value })
                        }
                        rows={4}
                        className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => deleteProjectItem(proj.id)}
                      className="px-2.5 py-1 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 mr-auto"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={cancelProjectEditing}
                      className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => saveProjectItem(proj.id)}
                      className="px-3 py-1.5 bg-brand-primary text-white rounded text-sm hover:bg-brand-primary-hover font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
