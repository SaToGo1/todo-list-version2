import Task from './task.js'

import { v4 as uuidv4 } from 'uuid'

export default class TaskModel {
  constructor () {
    this.tasks = []

    // Add some mock tasks
    this.tasks.push(
      ...mocktasks
    )
  }

  getAllTasks = () => {
    return this.tasks
  }

  createTask = ({ taskTitle }) => {
    const id = uuidv4()
    const newTask = new Task({ id, title: taskTitle })
    console.log('new Task: ', newTask)

    this.tasks.push(newTask)

    return {
      id,
      isStored: true
    }
  }
}

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
  })
]
