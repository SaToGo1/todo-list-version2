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

    this.controllerSections = new ControllerSection({
      view,
      sectionModel,
      taskModel,
      projectModel,
      setCurrentSection: this.setCurrentSection,
      getCurrentSection: this.getCurrentSection
    })
    this.controllerProjects = new ControllerProjects({
      view,
      projectModel,
      taskModel,
      setCurrentProject: this.setCurrentProject,
      getCurrentProject: this.getCurrentProject,
      reloadSection: this.reloadSection
    })
    this.controllerMain = new ControllerMain({
      view,
      taskModel,
      projectModel,
      getCurrentProject: this.getCurrentProject,
      getCurrentSection: this.getCurrentSection,
      reloadSection: this.reloadSection
    })
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

  setCurrentSection = ({ section }) => {
    this.currentProject = null
    this.currentSection = section
  }

  getCurrentSection = () => {
    return this.currentSection
  }

  setCurrentProject = ({ projectId }) => {
    this.currentSection = ''
    this.currentProject = projectId
  }

  getCurrentProject = () => {
    return this.currentProject
  }

  reloadSection = ({ loadHome = false }) => {
    this.controllerSections.reloadSection({ loadHome })
  }
}
