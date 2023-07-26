// mockData.js
import { randomUUID } from 'crypto';

const sections = [
  { id: randomUUID(), name: 'home' },
  { id: randomUUID(), name: 'today' },
  { id: randomUUID(), name: 'tomorrow' },
  { id: randomUUID(), name: 'week' },
  { id: randomUUID(), name: 'month' }
]

const projects = [
  { id: randomUUID(), name: 'Project 1', color: '#00aaff' },
  { id: randomUUID(), name: 'Project 2', color: '#00ff00' }
  // ... More projects
]

const tasks = [
  {
    id: randomUUID(),
    projectId: projects[0].id,
    title: 'Task 1',
    description: 'Do something',
    date: new Date('2023-07-15'),
    completed: false
  },
  {
    id: randomUUID(),
    projectId: projects[0].id,
    title: 'Task 2',
    description: 'Do something else',
    date: new Date('2023-07-17'),
    completed: true
  },
  {
    id: randomUUID(),
    projectId: projects[1].id,
    title: 'Task 3',
    description: 'Complete the project',
    date: new Date('2023-07-20'),
    completed: false
  }
  // ... More tasks
]

export { sections, projects, tasks }
