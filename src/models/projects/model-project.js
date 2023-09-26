import Project from './project.js'

import { v4 as uuidv4 } from 'uuid'

export default class ProjectModel {
  constructor () {
    this.projects = []
  }

  createProjects = ({ name }) => {
    const id = uuidv4()
    const newProject = new Project(id, name)

    this.projects.push(newProject)

    return {
      id,
      isAdded: true
    }
  }
}
