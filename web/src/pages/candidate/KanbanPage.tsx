import { useAppSelector } from '../../store/hooks';
import { KanbanBoard } from '../../features/applications/components/Kanban/KanbanBoard';

/**
 * KanbanPage — Main candidate pipeline tracking screen.
 * Displays application status lanes in a side-scrollable Kanban board.
 */
export const KanbanPage = () => {
  const applications = useAppSelector((state) => state.kanban.applications);

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Application Pipeline
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Track and manage your submitted resumes and interview progress stages.
        </p>
      </div>

      <KanbanBoard applications={applications} />
    </div>
  );
};
