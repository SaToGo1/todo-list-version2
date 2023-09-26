// LAYOUT
import { headerTemplate } from './Layouts/header/header'
import { mainTemplate } from './Layouts/main/main'

import {
  sidebarTemplate,
  sidebarSectionRender,
  renderAddProjectConfirmation,
  renderAddProjectButton,
  renderProject
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

  /* ###########
   # Sections #
   ########### */
  renderSections = ({ div, sectionNames }) => {
    sidebarSectionRender({ div, sectionNames })
  }

  /* ###########
   # Projects #
   ########### */
  renderConfirmation = ({ div }) => {
    renderAddProjectConfirmation({ div })
  }

  renderAddProjectButton = ({ div }) => {
    renderAddProjectButton({ div })
  }

  renderProject = ({ div, id, name }) => {
    renderProject({ div, id, name })
  }
}
