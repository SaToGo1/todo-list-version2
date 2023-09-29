import {
  HOME_SECTION,
  TODAY_SECTION,
  TOMORROW_SECTION,
  WEEK_SECTION,
  MONTH_SECTION
} from '../../constants/section-constants.js'

import { filterCompletedTasks, filterNotCompletedTasks } from '../filterTasks/filterTasks.js'
export default class ControllerSection {
  constructor ({ view, sectionModel, taskModel }) {
    this.view = view
    this.sectionModel = sectionModel
    this.taskModel = taskModel

    this.sectionDiv = document.querySelector('.nav__sectionsDiv')
    this.mainDiv = document.querySelector('.main')
  }

  initializeControllerSection = () => {
    const sectionNames = this.sectionModel.getSectionNames()
    this.view.renderSections({ div: this.sectionDiv, sectionNames })

    // eventclick
    this.sectionDiv.addEventListener('click', this._SectionDivHandler)
  }

  _SectionDivHandler = (event) => {
    const tasks = this.taskModel.getAllTasks()
    let completedTasks, notCompletedTasks

    switch (event.target.id) {
      case `navSection__${HOME_SECTION}`:
        console.log('Home Clicked')
        completedTasks = filterCompletedTasks(tasks)
        notCompletedTasks = filterNotCompletedTasks(tasks)
        this.view.renderPage({
          div: this.mainDiv,
          completedTasks,
          notCompletedTasks,
          name: HOME_SECTION
        })
        break

      case `navSection__${TODAY_SECTION}`:
        console.log('Today Clicked')
        break

      case `navSection__${TOMORROW_SECTION}`:
        console.log('Tomorrow Clicked')
        break

      case `navSection__${WEEK_SECTION}`:
        console.log('Week Clicked')
        break

      case `navSection__${MONTH_SECTION}`:
        console.log('Month Clicked')
        break

      default:
        break
    }
  }
}
