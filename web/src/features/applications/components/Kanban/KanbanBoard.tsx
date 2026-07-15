import React from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { KanbanColumn } from './KanbanColumn';
import type { ApplicationCard, PipelineStage } from '../../types/kanban.types';
import { useAppDispatch } from '../../../../store/hooks';
import { updateApplicationStage } from '../../../../store/slices/kanban.slice';

interface KanbanBoardProps {
  applications: ApplicationCard[];
}

interface ColumnConfig {
  title: string;
  stage: PipelineStage;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ applications }) => {
  const dispatch = useAppDispatch();
  const columns: ColumnConfig[] = [
    { title: 'Applied', stage: 'APPLIED' },
    { title: 'Screening', stage: 'SCREENING' },
    { title: 'Interviewing', stage: 'INTERVIEWING' },
    { title: 'Offered', stage: 'OFFERED' },
    { title: 'Rejected', stage: 'REJECTED' },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const stages: PipelineStage[] = ['APPLIED', 'SCREENING', 'INTERVIEWING', 'OFFERED', 'REJECTED'];
    let targetStage: PipelineStage | null = null;

    if (stages.includes(overId as PipelineStage)) {
      targetStage = overId as PipelineStage;
    } else {
      const targetApp = applications.find((app) => app.id === overId);
      if (targetApp) {
        targetStage = targetApp.stage;
      }
    }

    if (targetStage) {
      dispatch(updateApplicationStage({ id: activeId, stage: targetStage }));
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 max-w-full scrollbar-thin select-none">
        {columns.map((col) => {
          const colApps = applications.filter((app) => app.stage === col.stage);
          return (
            <KanbanColumn
              key={col.stage}
              title={col.title}
              stage={col.stage}
              applications={colApps}
            />
          );
        })}
      </div>
    </DndContext>
  );
};
