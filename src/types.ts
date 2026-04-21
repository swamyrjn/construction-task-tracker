export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'To Do' | 'In Progress' | 'Blocked' | 'Done';

export const TASK_STATUSES: Status[] = ['To Do', 'In Progress', 'Blocked', 'Done'];

export type Task = {
  id: number;
  name: string;
  description: string;
  location: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  assignee: {
    initials: string;
    name: string;
  };
};

export type TeamMember = {
  name: string;
  title: string;
  email: string;
  phone: string;
  initials: string;
  total: number;
  active: number;
  done: number;
};