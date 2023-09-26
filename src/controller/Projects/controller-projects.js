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
    // CLICK on add new Project
    if (event.target.className === 'nav__addProjectButton' ||
        event.target.className === 'nav__addProjectIcon') {
      this.view.renderConfirmation({ div: this.projectsDiv })
    }

    // Handle click on Accept or Cancel in the confirmation Div
    // that appears after clicking the add new Project button.
    // ACCEPT
    if (event.target.className === 'navConfirmation__accept') {
      console.log('accept')
      const name = document.querySelector('.navConfirmation__input').value

      const { id, isAdded } = this.projectModel.createProjects({ name })
      this.view.renderAddProjectButton({ div: this.projectsDiv })
    }
    // CANCEL
    if (event.target.className === 'navConfirmation__cancel') {
      console.log('cancel')
      this.view.renderAddProjectButton({ div: this.projectsDiv })
    }
  }
}
