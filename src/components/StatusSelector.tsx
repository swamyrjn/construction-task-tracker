import type { TaskStatus } from '../types';

const STATUS_OPTIONS: TaskStatus[] = ['To Do', 'In Progress', 'Blocked', 'Done'];

const STATUS_CLASS: Record<TaskStatus, string> = {
  'To Do': 'status-select status-select--todo',
  'In Progress': 'status-select status-select--in-progress',
  'Blocked': 'status-select status-select--blocked',
  'Done': 'status-select status-select--done',
};

type Props = {
  taskId: number;
  value: TaskStatus;
  onChange: (taskId: number, status: TaskStatus) => void;
};

export function StatusSelector({ taskId, value, onChange }: Props) {
  return (
    <select
      className={STATUS_CLASS[value]}
      aria-label="Update task status"
      value={value}
      onChange={(e) => onChange(taskId, e.target.value as TaskStatus)}
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
