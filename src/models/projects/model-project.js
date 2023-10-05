import Project from './project.js'

import { v4 as uuidv4 } from 'uuid'
import { mockprojects } from '../../mockData/mock.js' // MOCK DATA -- DELETE AFTER

export default class ProjectModel {
  constructor () {
    this.projects = []

    // Add some mock tasks // MOCK DATA -- DELETE AFTER
    this.projects.push(
      ...mockprojects
    )
  }

  createProjects = ({ name }) => {
    const id = uuidv4()
    const newProject = new Project({ id, name })

    this.projects.push(newProject)

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

    return {
      isDeleted: true
    }
  }
}
