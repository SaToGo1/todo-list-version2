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
    this.projects = this.projects.filter(project => project.id !== id)

    // LOCAL STORAGE
    saveLocalStorage({ item: localStorageItem, array: this.projects })

    return {
      isDeleted: true
    }
  }
}
