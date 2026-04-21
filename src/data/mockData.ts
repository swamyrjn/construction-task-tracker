import type { Task, TeamMember } from '../types';

export const tasks: Task[] = [
  {
    id: 1,
    name: 'Safety Inspection - Block B',
    description: 'Conduct comprehensive safety inspection of Block B construction area.',
    location: 'Block B',
    dueDate: 'Apr 9, 2026',
    priority: 'High',
    status: 'To Do',
    assignee: { initials: 'SC', name: 'Sarah Chen' }
  },
  {
    id: 2,
    name: 'Foundation Rebar Check - Ground Floor',
    description: 'Inspect and verify rebar placement for ground floor foundation.',
    location: 'Ground Floor, Block A',
    dueDate: 'Apr 10, 2026',
    priority: 'Medium',
    status: 'Blocked',
    assignee: { initials: 'MT', name: 'Michael Torres' }
  },
  {
    id: 3,
    name: 'Floor 1, Block A - Pour Concrete',
    description: 'Coordinate concrete pour and quality checks for Floor 1 slab.',
    location: 'Floor 1, Block A',
    dueDate: 'Apr 11, 2026',
    priority: 'High',
    status: 'To Do',
    assignee: { initials: 'DK', name: 'David Kim' }
  },
  {
    id: 4,
    name: 'Install HVAC Units - Floor 2',
    description: 'Complete installation of HVAC units on the second floor of Building A.',
    location: 'Floor 2, Building A',
    dueDate: 'Apr 12, 2026',
    priority: 'High',
    status: 'In Progress',
    assignee: { initials: 'JM', name: 'John Martinez' }
  },
  {
    id: 5,
    name: 'Roof Membrane Installation',
    description: 'Install waterproof membrane on Building B roof section.',
    location: 'Roof, Building B',
    dueDate: 'Apr 14, 2026',
    priority: 'High',
    status: 'Done',
    assignee: { initials: 'MT', name: 'Michael Torres' }
  }
];

export const teamMembers: TeamMember[] = [
  {
    name: 'John Martinez',
    title: 'Project Manager',
    email: 'john.martinez@trimble.com',
    phone: '+1 (555) 132-8117',
    initials: 'JM',
    total: 2,
    active: 1,
    done: 0
  },
  {
    name: 'Sarah Chen',
    title: 'Project Manager',
    email: 'sarah.chen@trimble.com',
    phone: '+1 (555) 965-4121',
    initials: 'SC',
    total: 2,
    active: 0,
    done: 1
  },
  {
    name: 'Michael Torres',
    title: 'Project Manager',
    email: 'michael.torres@trimble.com',
    phone: '+1 (555) 945-5793',
    initials: 'MT',
    total: 2,
    active: 2,
    done: 0
  },
  {
    name: 'David Kim',
    title: 'Project Manager',
    email: 'david.kim@trimble.com',
    phone: '+1 (555) 976-9406',
    initials: 'DK',
    total: 1,
    active: 0,
    done: 0
  },
  {
    name: 'Emily Rodriguez',
    title: 'Project Manager',
    email: 'emily.rodriguez@trimble.com',
    phone: '+1 (555) 275-9871',
    initials: 'ER',
    total: 2,
    active: 1,
    done: 0
  },
  {
    name: 'James Wilson',
    title: 'Project Manager',
    email: 'james.wilson@trimble.com',
    phone: '+1 (555) 111-7656',
    initials: 'JW',
    total: 1,
    active: 0,
    done: 1
  }
];