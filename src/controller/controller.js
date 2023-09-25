// CONTROLLER MODULES
import ControllerSection from './Section/controller-section'
import ControllerProjects from './Projects/controller-projects'

// MODEL MODULES
import {
  sectionModel,
  projectModel
} from '../models/model.js'

export default class Controller {
  constructor (view) {
    this.view = view

    this.controllerSection = new ControllerSection({ view, sectionModel })
    this.controllerProjects = new ControllerProjects({ view, projectModel })
  }

  initializeController = () => {
    this.controllerSection.initializeControllerSection()
    this.controllerProjects.initializeControllerProjects()
    // controller Section.
    // controller Project.
    // controller Tasks.
    return 0
  }
}
