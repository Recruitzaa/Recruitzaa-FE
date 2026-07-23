import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanCard } from './KanbanCard';
import type { ApplicationCard, PipelineStage } from '../../types/kanban.types';

interface KanbanColumnProps {
  title: string;
  stage: PipelineStage;
  applications: ApplicationCard[];
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, stage, applications }) => {
  const { setNodeRef } = useDroppable({
    id: stage,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-200 dark:border-slate-800 rounded-lg min-w-[240px] max-h-[700px] overflow-hidden"
    >
      {/* Header Info */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <span className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
          {title}
        </span>
        <span className="text-sm font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-350">
          {applications.length}
        </span>
      </div>

      {/* Cards List container */}
      <SortableContext
        items={applications.map((app) => app.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
          {applications.map((app) => (
            <KanbanCard key={app.id} application={app} />
          ))}
          {applications.length === 0 && (
            <div className="text-center py-8 text-[11px] text-slate-400 italic">
              No applications in this stage
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};
