import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ApplicationCard } from '../../types/kanban.types';

interface KanbanCardProps {
  application: ApplicationCard;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ application }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: application.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow transition-shadow select-none"
    >
      <div className="text-[10px] font-bold text-[#c14f16] uppercase tracking-wide">
        {application.companyName}
      </div>
      <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1 mb-2">
        {application.jobTitle}
      </h4>
      <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-2">
        <span>{application.salaryEstimate}</span>
        <span>{application.updatedAt}</span>
      </div>
    </div>
  );
};
