import Project from './project.js'

import { v4 as uuidv4 } from 'uuid'

export default class ProjectModel {
  constructor () {
    this.projects = []

    // Add some mock tasks
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

  getProject ({ projectID }) {
    return this.projects.find(project => project.id === projectID)
  }
}

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
