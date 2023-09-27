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
    console.log(event.target.id)
    if (event.target.id === 'nav__addProjectButton' ||
        event.target.id === 'nav__addProjectIcon') {
      this.view.renderConfirmation({ div: this.projectsDiv })
    }

    // Handle click on Accept or Cancel in the confirmation Div
    // that appears after clicking the add new Project button.
    // ACCEPT
    if (event.target.id === 'navConfirmation__accept') {
      console.log('accept')
      const name = document.querySelector('.navConfirmation__input').value

      const { id, isStored } = this.projectModel.createProjects({ name })

      if (isStored) {
        this.view.renderProject({ div: this.projectsDiv, id, name })
        this.view.renderAddProjectButton({ div: this.projectsDiv })
      }
    }
    // CANCEL
    if (event.target.id === 'navConfirmation__cancel') {
      console.log('cancel')
      this.view.renderAddProjectButton({ div: this.projectsDiv })
    }
  }
}
