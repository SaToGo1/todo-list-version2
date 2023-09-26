// LAYOUT
import { headerTemplate } from './Layouts/header/header'
import { sidebarTemplate, sidebarSectionRender, addProjectConfirmationRender } from './Layouts/sidebar/sidebar'
import { mainTemplate } from './Layouts/main/main'

export default class View {
  constructor () {
    this.app = document.getElementById('app')

    this.renderApp()
    this.nav = document.querySelector('.nav') // ???
  }

  /**
   * Render the whole application.
   */
  renderApp () {
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
  renderSections ({ div, sectionNames }) {
    sidebarSectionRender({ div, sectionNames })
  }

  /* ###########
   # Projects #
   ########### */
  renderConfirmation ({ div }) {
    addProjectConfirmationRender({ div })
  }
}
