// LAYOUT
import { headerTemplate } from './Layouts/header/header'
import { sidebarTemplate } from './Layouts/sidebar/sidebar'

export class View {
  constructor () {
    this.app = document.getElementById('app')
  }

  /**
   * Render the whole application.
   */
  renderApp = () => {
    const header = headerTemplate()
    const sidebar = sidebarTemplate()

    const App = `
    ${header}
    ${sidebar}
    `

    this.app.innerHTML = App
  }
}
