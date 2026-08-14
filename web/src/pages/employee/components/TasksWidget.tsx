import React, { useState } from 'react';
import { useToast } from '../../../hooks/useToast';
import { ClipboardList, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  project: string;
  deadlineISO: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'In Progress' | 'Completed';
}

export const TasksWidget: React.FC = () => {
  const toast = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'tsk1',
      title: 'Integrate Core Telecomm billing gateway webhook APIs',
      project: 'Telecomm-Core-Stream',
      deadlineISO: '2026-07-22T18:00:00.000Z',
      priority: 'High',
      status: 'In Progress',
    },
    {
      id: 'tsk2',
      title: 'Audit websocket packet dropping in night-shift stream',
      project: 'Telecomm-Core-Stream',
      deadlineISO: '2026-07-25T23:59:59.000Z',
      priority: 'High',
      status: 'Not Started',
    },
    {
      id: 'tsk3',
      title: 'Design user settings mockup for multi-role platform launchpad',
      project: 'Internal-Design-Audit',
      deadlineISO: '2026-07-29T17:00:00.000Z',
      priority: 'Medium',
      status: 'Completed',
    },
  ]);

  const handleUpdateStatus = (id: string, nextStatus: Task['status']) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: nextStatus } : t)));
    toast.success(`Task status updated to ${nextStatus}.`);
  };

  const getDaysRemaining = (deadlineISO: string) => {
    const diff = new Date(deadlineISO).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <>
      <section
        className="bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4"
        aria-labelledby="tasks-title"
      >
        <div>
          <h2
            id="tasks-title"
            className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2"
          >
            <ClipboardList size={16} className="text-[#c14f16]" aria-hidden="true" /> Assigned Tasks
            & Deadline Tracker
          </h2>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
            Monitor sprint deliverables, trace task completion milestones, and check remaining
            deadline windows.
          </p>
        </div>

        {/* Deadline Track Sheet List */}
        <div className="space-y-4 pt-2">
          {tasks.map((task) => {
            const daysLeft = getDaysRemaining(task.deadlineISO);
            const isOverdue = daysLeft < 0;

            return (
              <div
                key={task.id}
                className="p-4 border border-slate-100 dark:border-slate-850 rounded-xl bg-slate-50/20 dark:bg-slate-900/10 space-y-3"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <span className="text-xs font-extrabold text-[#c14f16] tracking-wider uppercase block">
                      {task.project}
                    </span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                        task.priority === 'High'
                          ? 'bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400'
                          : 'bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {task.priority} Priority
                    </span>
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleUpdateStatus(task.id, e.target.value as Task['status'])
                      }
                      aria-label={`Update status for ${task.title}`}
                      className="border border-slate-200 dark:border-slate-800 rounded px-2 py-1 text-sm bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-350 focus-visible:outline-2 focus-visible:outline-[#c14f16]"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Progress bar / Deadline info */}
                <div className="flex items-center justify-between text-sm text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-850">
                  <div className="flex items-center gap-1">
                    {task.status === 'Completed' ? (
                      <CheckCircle2
                        size={12}
                        className="text-green-500 shrink-0"
                        aria-hidden="true"
                      />
                    ) : isOverdue ? (
                      <AlertCircle size={12} className="text-red-500 shrink-0" aria-hidden="true" />
                    ) : (
                      <Clock size={12} className="text-amber-500 shrink-0" aria-hidden="true" />
                    )}
                    <span>
                      {task.status === 'Completed'
                        ? 'Completed'
                        : isOverdue
                          ? 'Overdue'
                          : `Deadline: ${new Date(task.deadlineISO).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`}
                    </span>
                  </div>

                  <span
                    className={`font-bold ${isOverdue && task.status !== 'Completed' ? 'text-red-650' : 'text-slate-650 dark:text-slate-400'}`}
                  >
                    {task.status === 'Completed'
                      ? 'Done'
                      : isOverdue
                        ? 'Overdue'
                        : `${daysLeft} days left`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default TasksWidget;
