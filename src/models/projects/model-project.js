import Project from './project.js'

import { v4 as uuidv4 } from 'uuid'
import { mockprojects } from '../../mockData/mock.js' // MOCK DATA -- DELETE AFTER

import { saveLocalStorage, loadLocalStorage } from '../localStorage/localStorage.js'
const localStorageItem = 'projectArray'

export default class ProjectModel {
  constructor () {
    const {
      isStoredInLocal,
      storedData: storedProjects
    } = loadLocalStorage({ item: localStorageItem })

    if (isStoredInLocal) {
      this.projects = storedProjects
    } else {
      this.projects = []

      // Add some mock tasks // MOCK DATA -- DELETE AFTER
      this.projects.push(
        ...mockprojects
      )
    }
  }

  createProjects = ({ name }) => {
    const id = uuidv4()
    const newProject = new Project({ id, name })

    this.projects.push(newProject)

    // LOCAL STORAGE
    saveLocalStorage({ item: localStorageItem, array: this.projects })

    return {
      newProject,
      isStored: true
    }
  }

  getAllProjects () {
    return this.projects
  }

  deleteProject = ({ id }) => {
    console.log(id)
    this.projects = this.projects.filter(project => project.id !== id)

    console.log(this.projects)
    // LOCAL STORAGE
    saveLocalStorage({ item: localStorageItem, array: this.projects })

    return {
      isDeleted: true
    }
  }

  updateProject = ({ id, updatedFields }) => {
    const projectToUpdate = this.projects.find(project => project.id === id)

    if (projectToUpdate) {
      // Update the specified fields
      Object.assign(projectToUpdate, updatedFields)

      // LOCAL STORAGE
      saveLocalStorage({ item: localStorageItem, array: this.projects })

      return {
        updatedProject: projectToUpdate,
        isUpdated: true
      }
    } else {
      // Task with the provided ID not found
      return {
        updatedProject: null,
        isUpdated: false
      }
    }
  }
}
