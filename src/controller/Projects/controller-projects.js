export default class ControllerProjects {
  constructor ({ view, projectModel }) {
    this.view = view
    this.projectModel = projectModel
    this.projectsDiv = document.querySelector('.nav__projectsDiv')
  }

  initializeControllerProjects = () => {
    this.projectsDiv.addEventListener('click', this._ProjectDivHandler)
  }

  _ProjectDivHandler = (event) => {
    if (this._ClickOnAddProjectButton(event)) return 0
    else if (this._ClickOnConfirmationDiv(event)) return 0
    else console.log('test')
  }

  _ClickOnAddProjectButton = (event) => {
    // CLICK on add new Project
    if (event.target.id === 'nav__addProjectButton' ||
    event.target.id === 'nav__addProjectIcon') {
      this.view.renderConfirmation({ div: this.projectsDiv })
      return true
    }

    return false
  }

  _ClickOnConfirmationDiv = (event) => {
    // Handle click on Accept or Cancel in the confirmation Div
    // that appears after clicking the add new Project button.
    // ACCEPT BUTTON
    if (event.target.id === 'navConfirmation__accept') {
      const name = document.querySelector('.navConfirmation__input').value

      const { id, isStored } = this.projectModel.createProjects({ name })

      if (isStored) {
        this.view.renderProject({ div: this.projectsDiv, id, name })
        this.view.renderAddProjectButton({ div: this.projectsDiv })
        return true
      }
    }

    // CANCEL BUTTON
    if (event.target.id === 'navConfirmation__cancel') {
      this.view.renderAddProjectButton({ div: this.projectsDiv })
      return true
    }

    return false
  }
}
