import { Plus, Edit2 } from 'lucide-react';
import { useId } from 'react';
import type { ProjectItem } from '../../../../store/slices/profileSlice';

interface ProjectsCardProps {
  projects: ProjectItem[];
  editingProjectIndex: number | null;
  setEditingProjectIndex: (index: number | null) => void;
  startEditingProject: (index: number) => void;
  projectForm: ProjectItem;
  setProjectForm: (form: ProjectItem) => void;
  saveProjectItem: (index: number) => void;
  deleteProjectItem: (index: number) => void;
  addNewProjectItem: () => void;
}

export const ProjectsCard = ({
  projects,
  editingProjectIndex,
  setEditingProjectIndex,
  startEditingProject,
  projectForm,
  setProjectForm,
  saveProjectItem,
  deleteProjectItem,
  addNewProjectItem,
}: ProjectsCardProps) => {
  const idPrefix = useId();

  return (
    <div
      id="projects"
      className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4 scroll-mt-24"
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
        {projects.map((proj, index) => {
          const nameId = `${idPrefix}-proj-name-${index}`;
          const clientId = `${idPrefix}-proj-client-${index}`;
          const durationId = `${idPrefix}-proj-duration-${index}`;
          const descriptionId = `${idPrefix}-proj-description-${index}`;

          return (
            <div
              key={`${proj.name}-${index}`}
              className="relative border-l-2 border-orange-200 pl-4 space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{proj.name}</h4>
                  <div className="text-sm font-semibold text-slate-500 mt-0.5">
                    {proj.client} <span aria-hidden="true">&bull;</span>{' '}
                    <span className="font-normal text-slate-400">{proj.duration}</span>
                  </div>
                </div>
                {editingProjectIndex !== index && (
                  <button
                    type="button"
                    onClick={() => startEditingProject(index)}
                    className="text-slate-400 hover:text-brand-primary"
                    aria-label={`Edit ${proj.name}`}
                  >
                    <Edit2 size={14} />
                  </button>
                )}
              </div>

              {editingProjectIndex !== index ? (
                <p className="text-sm text-slate-600 leading-relaxed">{proj.description}</p>
              ) : (
                <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-3 mt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label
                        htmlFor={nameId}
                        className="text-[9px] font-bold text-slate-500 uppercase block"
                      >
                        Project Name
                      </label>
                      <input
                        id={nameId}
                        type="text"
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                        className="w-full border border-slate-200 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor={clientId}
                        className="text-[9px] font-bold text-slate-500 uppercase block"
                      >
                        Client
                      </label>
                      <input
                        id={clientId}
                        type="text"
                        value={projectForm.client}
                        onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                        className="w-full border border-slate-200 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label
                        htmlFor={durationId}
                        className="text-[9px] font-bold text-slate-500 uppercase block"
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
                        className="w-full border border-slate-200 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label
                        htmlFor={descriptionId}
                        className="text-[9px] font-bold text-slate-500 uppercase block"
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
                        className="w-full border border-slate-200 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => deleteProjectItem(index)}
                      className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded text-[11px] font-semibold hover:bg-red-100 mr-auto"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProjectIndex(null)}
                      className="px-3 py-1.5 border rounded text-sm hover:bg-slate-100 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => saveProjectItem(index)}
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
