import { sectionModel } from '../models/model.js'
import ControllerSection from './Section/controller-section'

export default class Controller {
  constructor (view) {
    this.view = view

    this.controlerSection = new ControllerSection({ view, sectionModel })
  }

  initializeController = () => {
    this.controlerSection.initializeControllerSection()
    // controller Section.
    // controller Project.
    // controller Tasks.
    return 0
  }
}
