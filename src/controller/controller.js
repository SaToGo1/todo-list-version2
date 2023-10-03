// CONTROLLER MODULES
import ControllerSection from './section/controller-section'
import ControllerProjects from './projects/controller-projects'
import ControllerMain from './main/controller-main'

// MODEL MODULES
import {
  sectionModel,
  projectModel,
  taskModel
} from '../models/model.js'

export default class Controller {
  constructor (view) {
    this.view = view

    // Initialize the current section to home
    this.currentSection = 'home'

    // Initialize the current project to null (no project selected initially)
    this.currentProject = null

    this.controllerSections = new ControllerSection({ view, sectionModel, taskModel, setCurrentSection: this.setCurrentSection })
    this.controllerProjects = new ControllerProjects({ view, projectModel, taskModel, setCurrentProject: this.setCurrentProject })
    this.controllerMain = new ControllerMain({ view, taskModel })
  }

  initializeController = () => {
    // SECTION
    this.controllerSections.initializeControllerSection()
    // PROJECTS
    this.controllerProjects.initializeControllerProjects()
    // TASKS.
    this.controllerMain.initializeControllerMain()
    // ...
    return 0
  }

  setCurrentSection = (section) => {
    this.currentProject = null
    this.currentSection = section
  }

  getCurrentSection = () => {
    return this.currentSection
  }

  setCurrentProject = (projectId) => {
    this.currentSection = ''
    this.currentProject = projectId
  }

  getCurrentProject = () => {
    return this.currentProject
  }
}
