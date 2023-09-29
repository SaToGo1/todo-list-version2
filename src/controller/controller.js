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

    this.controllerSections = new ControllerSection({ view, sectionModel, taskModel })
    this.controllerProjects = new ControllerProjects({ view, projectModel, taskModel })
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
}
