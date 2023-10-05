import Task from '../models/tasks/task'
import Project from '../models/projects/project'

const mockprojects = [
  new Project({
    id: '13',
    name: 'Test Project 13'
  }),
  new Project({
    id: '14',
    name: 'Test Project 14'
  })
]

// MOCK DATA WILL BE DELETED
const today = new Date().toISOString().split('T')[0]

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const tomorrowDate = tomorrow.toISOString().split('T')[0]

// Get the current date
const currentDate = new Date()
// Generate a random day within the current month

const randomDayMonth = Math.floor(Math.random() * (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate())) + 1
// Set the date to the random day
const randomDateMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), randomDayMonth)
const MonthDate = randomDateMonth.toISOString().split('T')[0]

// Calculate the start of the week (Sunday)
const startOfWeek = new Date(currentDate)
startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
// Generate a random day within the current week
const randomDayWeek = Math.floor(Math.random() * 7)
const randomDateWeek = new Date(startOfWeek)
randomDateWeek.setDate(startOfWeek.getDate() + randomDayWeek)

const WeekDate = randomDateWeek.toISOString().split('T')[0]

const mocktasks = [
  new Task({
    id: '1',
    projectID: 'project1',
    title: 'Task 1',
    description: 'Description 1',
    date: '2023-09-10',
    completed: false
  }),
  new Task({
    id: '2',
    projectID: 'project1',
    title: 'Task 2',
    description: 'Description 2',
    date: '2023-09-11',
    completed: false
  }),
  new Task({
    id: '3',
    projectID: 'project2',
    title: 'Task 3',
    description: 'Description 3',
    date: '2023-09-30',
    completed: true
  }),
  new Task({
    id: '4',
    projectID: null,
    title: 'Task 4',
    description: 'Description 4',
    date: '2023-09-29',
    completed: false
  }),
  new Task({
    id: '5',
    projectID: 'project2',
    title: 'Task 5',
    description: 'Description 5',
    date: '',
    completed: false
  }),
  new Task({
    id: '6',
    projectID: 'project2',
    title: 'Task 6',
    description: 'Description 6',
    date: '2023-07-20',
    completed: true
  }),
  new Task({
    id: '7',
    projectID: 'project3',
    title: 'Task 7 TODAY',
    description: 'Description 7',
    date: today,
    completed: false
  }),
  new Task({
    id: '8',
    projectID: 'project3',
    title: 'Task 8 TODAY',
    description: 'Description 8',
    date: today,
    completed: false
  }),
  new Task({
    id: '9',
    projectID: 'project4',
    title: 'Task 9 TODAY',
    description: 'Description 9',
    date: today,
    completed: true
  }),
  new Task({
    id: '10',
    projectID: 'project5',
    title: 'Task 10 Tomorrow',
    description: 'Description 10',
    date: tomorrowDate,
    completed: false
  }),
  new Task({
    id: '11',
    projectID: 'project5',
    title: 'Task 11 Week',
    description: 'Description 11',
    date: WeekDate,
    completed: false
  }),
  new Task({
    id: '12',
    projectID: 'project6',
    title: 'Task 12 Month',
    description: 'Description 12',
    date: MonthDate,
    completed: true
  }),
  new Task({
    id: '13',
    projectID: '13',
    title: 'Task 13 Project TEST',
    description: 'Description 13',
    date: '',
    completed: true
  }),
  new Task({
    id: '14',
    projectID: '14',
    title: 'Task 14 Project TEST',
    description: 'Description 14',
    date: '',
    completed: false
  }),
  new Task({
    id: '15',
    projectID: '13',
    title: 'Task 15 Project TEST',
    description: 'Description 15',
    date: '',
    completed: false
  })
]

export { mocktasks, mockprojects }
