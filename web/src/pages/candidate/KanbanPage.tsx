import { useAppSelector } from '../../store/hooks';
import { KanbanBoard } from '../../features/applications/components/Kanban/KanbanBoard';
import { SEO } from '../../components/seo/SEO';

/**
 * KanbanPage — Main candidate pipeline tracking screen.
 * Displays application status lanes in a side-scrollable Kanban board.
 */
export const KanbanPage = () => {
  const applications = useAppSelector((state) => state.kanban.applications);

  return (
    <div className="flex flex-col">
      <SEO
        title="Application Tracker | Recruitzaa"
        description="Kanban tracking board for candidate application pipeline stages."
      />
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Application Pipeline
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {import.meta.env.DEV
            ? 'Demo pipeline: dragging a card only changes browser state and does not contact an employer.'
            : 'Drag cards across stages to track your application progress.'}
        </p>
      </div>

      <KanbanBoard applications={applications} />
    </div>
  );
};
