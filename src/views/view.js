// LAYOUT
import { headerTemplate } from './Layouts/header/header'
import { sidebarTemplate } from './Layouts/sidebar/sidebar'
import { mainTemplate } from './Layouts/main/main'

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
    const main = mainTemplate()

    const App = `
    ${header}
    ${sidebar}
    ${main}
    `

    this.app.innerHTML = App
  }
}
