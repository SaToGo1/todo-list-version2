import Task from '../models/tasks/task'
import Project from '../models/projects/project'

import { endOfWeek } from '../controller/date-functions/dateFunctions'
const mockprojects = [
  new Project({
    id: '1',
    name: 'House',
    color: '#00ff00'
  }),
  new Project({
    id: '2',
    name: 'Exercising',
    color: '#ff0000'
  }),
  new Project({
    id: '3',
    name: 'Work',
    color: '#00aaff'
  })
]

// MOCK DATA WILL BE DELETED
const todayDate = new Date().toISOString().split('T')[0]

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
const yesterdayDate = yesterday.toISOString().split('T')[0]

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const tomorrowDate = tomorrow.toISOString().split('T')[0]

const WeekDate = endOfWeek()

const mocktasks = [
  new Task({
    id: '1',
    projectID: '1',
    title: 'Clean the bedroom',
    description: '',
    date: todayDate,
    completed: false
  }),
  new Task({
    id: '2',
    projectID: '1',
    title: 'Clean the toilet',
    description: '',
    date: tomorrowDate,
    completed: false
  }),
  new Task({
    id: '3',
    projectID: '2',
    title: 'Go for a Walk',
    description: '',
    date: todayDate,
    completed: false
  }),
  new Task({
    id: '4',
    projectID: '2',
    title: 'HIIT - High Intensity Interval Training',
    description: '',
    date: yesterdayDate,
    completed: true
  }),
  new Task({
    id: '5',
    projectID: '3',
    title: 'Start the new Project',
    description: '',
    date: todayDate,
    completed: false
  }),
  new Task({
    id: '6',
    projectID: '3',
    title: 'Organize the different tasks of the project',
    description: '',
    date: WeekDate,
    completed: false
  }),
  new Task({
    id: '7',
    projectID: '',
    title: 'Watch a film',
    description: 'Description 7',
    date: todayDate,
    completed: false
  })
]

export { mocktasks, mockprojects }
