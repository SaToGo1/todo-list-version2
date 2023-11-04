// LAYOUT
import { headerTemplate } from './Layouts/header/header'

import {
  mainTemplate,
  renderPage,
  renderTask,
  renderTaskDetail,
  activeTaskStyle,
  updatedTask
} from './Layouts/main/mainPage.js'

import {
  sidebarTemplate,
  sidebarSectionRender,
  renderAddProjectConfirmation,
  renderAddProjectButton,
  renderProject,
  activePageStyle,
  renderAllProjects
} from './Layouts/sidebar/sidebar'

export default class View {
  constructor () {
    this.app = document.getElementById('app')

    this.renderApp()
    this.nav = document.querySelector('.nav') // ???
  }

  /**
   * Render the whole application.
   */
  renderApp = () => {
    const header = headerTemplate()
    const sidebar = sidebarTemplate()
    const main = mainTemplate()

    const App = `
    ${header}
    ${sidebar}
    ${main}
    `

    this.app.innerHTML = App
  }

  activePageStyle = ({ div }) => {
    activePageStyle({ div })
  }

  /* ############
     # Sections #
     ############ */
  renderSections = ({ div, sectionNames }) => {
    sidebarSectionRender({ div, sectionNames })
  }

  /* ############
     # Projects #
     ############ */
  renderConfirmation = ({ div }) => {
    renderAddProjectConfirmation({ div })
  }

  renderAddProjectButton = ({ div }) => {
    renderAddProjectButton({ div })
  }

  renderProject = ({ div, id, name }) => {
    renderProject({ div, id, name })
  }

  renderAllProjects = ({ div, projects }) => {
    renderAllProjects({ div, projects })
  }

  /* ###########
     # Main    #
     ########### */
  // not/completedtasks are Arrays of tasks
  // not/completedColor are arrays of strings with color, same size as tasks arrays.
  renderPage = ({ div, completedTasks, notCompletedTasks, name, colorCompletedTasks, colorNotCompletedTasks }) => {
    renderPage({ div, completedTasks, notCompletedTasks, name, colorCompletedTasks, colorNotCompletedTasks })
  }

  renderTask = ({ task, color }) => {
    renderTask({ task, color })
  }

  updateTask = ({ task }) => {
    updatedTask({ task })
  }

  // renderMultipleTasks ({ completedTasks, notCompletedTasks, colorCompletedTasks, colorNotCompletedTasks }) {
  //   renderMultipleTasks({ completedTasks, notCompletedTasks, colorCompletedTasks, colorNotCompletedTasks })
  // }

  renderTaskDetail = ({ div, task, project, projectArray }) => {
    renderTaskDetail({ div, task, project, projectArray })
  }

  activeTaskStyle ({ div }) {
    activeTaskStyle({ div })
  }
}
