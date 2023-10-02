import {
  HOME_SECTION,
  TODAY_SECTION,
  TOMORROW_SECTION,
  WEEK_SECTION,
  MONTH_SECTION
} from '../../constants/section-constants.js'

import { filterCompletedTasks, filterNotCompletedTasks } from '../filterTasks/filterTasks.js'
export default class ControllerSection {
  constructor ({ view, sectionModel, taskModel, setCurrentSection }) {
    // CLASSES
    this.view = view
    this.sectionModel = sectionModel
    this.taskModel = taskModel

    // CALLBAKCS
    this.setCurrentSection = setCurrentSection

    // DOM
    this.sectionDiv = document.querySelector('.nav__sectionsDiv')
    this.mainDiv = document.querySelector('.main')
  }

  initializeControllerSection = () => {
    // Home by default
    this._homeLoad()

    const sectionNames = this.sectionModel.getSectionNames()
    this.view.renderSections({ div: this.sectionDiv, sectionNames })

    // eventclick
    this.sectionDiv.addEventListener('click', this._SectionDivHandler)
  }

  _SectionDivHandler = (event) => {
    switch (event.target.id) {
      case `navSection__${HOME_SECTION}`:
        this._homeLoad()
        this.setCurrentSection(HOME_SECTION)
        break

      case `navSection__${TODAY_SECTION}`:
        console.log('Today Clicked')
        this.setCurrentSection(TODAY_SECTION)
        break

      case `navSection__${TOMORROW_SECTION}`:
        console.log('Tomorrow Clicked')
        this.setCurrentSection(TOMORROW_SECTION)
        break

      case `navSection__${WEEK_SECTION}`:
        console.log('Week Clicked')
        this.setCurrentSection(WEEK_SECTION)
        break

      case `navSection__${MONTH_SECTION}`:
        console.log('Month Clicked')
        this.setCurrentSection(MONTH_SECTION)
        break

      default:
        break
    }
  }

  _homeLoad = () => {
    const tasks = this.taskModel.getAllTasks()
    const completedTasks = filterCompletedTasks(tasks)
    const notCompletedTasks = filterNotCompletedTasks(tasks)
    this.view.renderPage({
      div: this.mainDiv,
      completedTasks,
      notCompletedTasks,
      name: HOME_SECTION
    })
  }

  _todayLoad = () => {
    // ...
  }
}
