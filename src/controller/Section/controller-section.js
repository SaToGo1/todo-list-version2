import {
  HOME_SECTION,
  TODAY_SECTION,
  TOMORROW_SECTION,
  WEEK_SECTION,
  MONTH_SECTION
} from '../../constants/section-constants.js'

import {
  filterCompletedTasks,
  filterNotCompletedTasks,
  filterBySection,
  colorfilter
} from '../utils/filterTasks/filterTasks.js'

export default class ControllerSection {
  constructor ({ view, sectionModel, taskModel, projectModel, setCurrentSection, getCurrentSection }) {
    // CLASSES
    this.view = view
    this.sectionModel = sectionModel
    this.taskModel = taskModel
    this.projectModel = projectModel

    // CALLBAKCS
    this.setCurrentSection = setCurrentSection
    this.getCurrentSection = getCurrentSection

    // DOM
    this.sectionDiv = document.querySelector('.nav__sectionsDiv')
    this.mainDiv = document.querySelector('.main')
  }

  initializeControllerSection = () => {
    // Home by default
    this._sectionLoad(HOME_SECTION)
    this.setCurrentSection({ section: HOME_SECTION })

    const sectionNames = this.sectionModel.getSectionNames()
    this.view.renderSections({ div: this.sectionDiv, sectionNames })

    // eventclick
    this.sectionDiv.addEventListener('click', this._SectionDivHandler)
  }

  _SectionDivHandler = (event) => {
    // HOME
    if (event.target.classList.contains(`navSection__${HOME_SECTION}-click`)) {
      this._sectionLoad(HOME_SECTION)
      this.view.activePageStyle({ div: event.target })

    // TODAY
    } else if (event.target.classList.contains(`navSection__${TODAY_SECTION}-click`)) {
      this._sectionLoad(TODAY_SECTION)
      this.view.activePageStyle({ div: event.target })

    // TOMORROW
    } else if (event.target.classList.contains(`navSection__${TOMORROW_SECTION}-click`)) {
      this._sectionLoad(TOMORROW_SECTION)
      this.view.activePageStyle({ div: event.target })

    // WEEK
    } else if (event.target.classList.contains(`navSection__${WEEK_SECTION}-click`)) {
      this._sectionLoad(WEEK_SECTION)
      this.view.activePageStyle({ div: event.target })

    // MONTH
    } else if (event.target.classList.contains(`navSection__${MONTH_SECTION}-click`)) {
      this._sectionLoad(MONTH_SECTION)
      this.view.activePageStyle({ div: event.target })
    }
  }

  _sectionLoad = (section) => {
    let tasks = this.taskModel.getAllTasks()
    tasks = filterBySection({ tasks, section })

    // Make the arrays of completed/not completed tasks
    const completedTasks = filterCompletedTasks({ tasks })
    const notCompletedTasks = filterNotCompletedTasks({ tasks })

    // Make the arrays of colors for completed/not completed tasks
    const projects = this.projectModel.getAllProjects()
    const colorCompletedTasks = colorfilter({ tasks: completedTasks, projects })
    const colorNotCompletedTasks = colorfilter({ tasks: notCompletedTasks, projects })

    this.view.renderPage({
      div: this.mainDiv,
      completedTasks,
      notCompletedTasks,
      name: section,
      colorCompletedTasks,
      colorNotCompletedTasks
    })

    this.setCurrentSection({ section })
  }

  reloadSection = ({ loadHome = false }) => {
    const currentSection = this.getCurrentSection()
    if (currentSection !== '') {
      this._sectionLoad(currentSection)
    }
    if (loadHome === true) {
      this._sectionLoad(HOME_SECTION)
    }
  }
}
