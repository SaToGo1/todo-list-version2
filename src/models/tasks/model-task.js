import Task from './task.js'

import { v4 as uuidv4 } from 'uuid'
import { mocktasks } from '../../mockData/mock.js' // MOCK DATA -- DELETE AFTER

import { saveLocalStorage, loadLocalStorage } from '../localStorage/localStorage.js'
const localStorageItem = 'taskArray'

export default class TaskModel {
  constructor () {
    const {
      isStoredInLocal,
      storedData: storedTasks
    } = loadLocalStorage({ item: localStorageItem })

    if (isStoredInLocal) {
      this.tasks = storedTasks
    } else {
      this.tasks = []

      // Add some mock tasks // MOCK DATA -- DELETE AFTER
      this.tasks.push(
        ...mocktasks
      )
    }
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

    // LOCAL STORAGE
    saveLocalStorage({ item: localStorageItem, array: this.tasks })

    return {
      newTask,
      isStored: true
    }
  }

  updateTask = ({ id, updatedFields }) => {
    const taskToUpdate = this.tasks.find(task => task.id === id)

    // VoidTitle
    if (updatedFields.title === '') {
      return {
        updatedTask: taskToUpdate,
        isUpdated: false
      }
    }

    if (taskToUpdate) {
      // Update the specified fields
      Object.assign(taskToUpdate, updatedFields)

      // LOCAL STORAGE
      saveLocalStorage({ item: localStorageItem, array: this.tasks })

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

    // LOCAL STORAGE
    saveLocalStorage({ item: localStorageItem, array: this.tasks })

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

    // LOCAL STORAGE
    saveLocalStorage({ item: localStorageItem, array: this.tasks })

    return {
      isDeleted: true
    }
  }
}
