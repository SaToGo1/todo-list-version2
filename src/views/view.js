// LAYOUT
import { headerTemplate } from './Layouts/header/header'
export class View {
  constructor () {
    this.app = document.getElementById('app')
  }

  renderApp = () => {
    const header = headerTemplate()

    const App = `
    ${header}`

    this.app.innerHTML = App
  }
}
