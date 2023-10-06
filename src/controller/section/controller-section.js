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
  filterBySection
} from '../filterTasks/filterTasks.js'

export default class ControllerSection {
  constructor ({ view, sectionModel, taskModel, setCurrentSection, getCurrentSection }) {
    // CLASSES
    this.view = view
    this.sectionModel = sectionModel
    this.taskModel = taskModel

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
    const completedTasks = filterCompletedTasks({ tasks })
    const notCompletedTasks = filterNotCompletedTasks({ tasks })
    this.view.renderPage({
      div: this.mainDiv,
      completedTasks,
      notCompletedTasks,
      name: section
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
