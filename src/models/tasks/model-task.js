import Task from './task.js'

import { v4 as uuidv4 } from 'uuid'
import { mocktasks } from '../../mockData/mock.js' // MOCK DATA -- DELETE AFTER

export default class TaskModel {
  constructor () {
    this.tasks = []

    // Add some mock tasks // MOCK DATA -- DELETE AFTER
    this.tasks.push(
      ...mocktasks
    )
  }

  getAllTasks = () => {
    return this.tasks
  }

  getTask = ({ id }) => {
    const task = this.tasks.find(task => task.id === id)
    const isStored = task !== undefined

    return {
      task,
      isStored
    }
  }

  createTask = ({ taskTitle, projectID = null, description = '', date = '' }) => {
    const id = uuidv4()
    const newTask = new Task({ id, projectID, title: taskTitle, description, date, completed: false })

    this.tasks.push(newTask)

    return {
      newTask,
      isStored: true
    }
  }

  updateTask = ({ id, updatedFields }) => {
    const taskToUpdate = this.tasks.find(task => task.id === id)

    if (taskToUpdate) {
      // Update the specified fields
      Object.assign(taskToUpdate, updatedFields)
      return {
        updatedTask: taskToUpdate,
        isUpdated: true
      }
    } else {
      // Task with the provided ID not found
      return {
        updatedTask: null,
        isUpdated: false
      }
    }
  }

  deleteTask = ({ id }) => {
    this.tasks = this.tasks.filter(task => task.id !== id)

    return {
      isDeleted: true
    }
  }

  deleteManyTasks = ({ tasksArray = [] }) => {
    if (tasksArray.length === 0) {
      this.tasks = []
      return 0
    }
    const tasksToDeleteSet = new Set(tasksArray.map(task => task.id))

    this.tasks = this.tasks.filter(task => !tasksToDeleteSet.has(task.id))

    return {
      isDeleted: true
    }
  }
}
