export default class ControllerProjects {
  constructor ({ view, projectModel }) {
    this.view = view
    this.projectModel = projectModel
    this.ProjectsDiv = document.querySelector('.nav__projectsDiv')
  }

  initializeControllerProjects () {
    this.ProjectsDiv.addEventListener('click', this._ProjectDivHandler)
  }

  _ProjectDivHandler (event) {
    console.log('you Clicked')

    // CLICK on add new Project
    if (event.target.className === 'nav__addProjectButton' ||
        event.target.className === 'nav__addProjectIcon') {
      console.log('add new project')
      // view Load Confirmation Project
    }
  }
}
