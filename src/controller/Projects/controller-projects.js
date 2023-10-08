// CONSTANTS with class/Id strings
import {
  confirmationAccept,
  confirmationCancel,
  addProjectButtonClass,
  addProjectIconClass,
  projectDeleteButton,
  projectColor,
  confirmationDiv,
  navContainer
} from '../../views/Layouts/sidebar/sidebar'

import {
  filterByProject,
  filterCompletedTasks,
  filterNotCompletedTasks
} from '../filterTasks/filterTasks'

export default class ControllerProjects {
  constructor ({ view, projectModel, taskModel, setCurrentProject, getCurrentProject, reloadSection }) {
    // CLASSES
    this.view = view
    this.projectModel = projectModel
    this.taskModel = taskModel

    // CALLBAKCS
    this.setCurrentProject = setCurrentProject
    this.getCurrentProject = getCurrentProject
    this.reloadSection = reloadSection

    // DOM
    this.projectsDiv = document.querySelector('.nav__projectsDiv')
    this.mainDiv = document.querySelector('.main')
  }

  initializeControllerProjects = () => {
    this.projectsDiv.addEventListener('click', this._projectDivHandler)
    this.projectsDiv.addEventListener('input', this._colorInput)

    const projects = this.projectModel.getAllProjects()
    this.view.renderAllProjects({ div: this.projectsDiv, projects })
  }

  _projectDivHandler = (event) => {
    // Add project button
    if (this._clickOnAddProjectButton(event)) return 0
    // confirm project and project name
    else if (this._clickOnConfirmationDiv(event)) return 0
    else if (this._deleteProjectClick(event)) return 0
    else if (this._colorInputClick(event)) return 0
    // other
    this._clickOnProject(event)
  }

  _clickOnAddProjectButton = (event) => {
    // CLICK on add new Project
    if (event.target.id === addProjectButtonClass ||
    event.target.id === addProjectIconClass) {
      this.view.renderConfirmation({ div: this.projectsDiv })
      return true
    }

    return false
  }

  _clickOnConfirmationDiv = (event) => {
    // Handle click on Accept or Cancel in the confirmation Div
    // that appears after clicking the add new Project button.
    // ACCEPT BUTTON
    if (event.target.id === confirmationAccept) {
      const name = document.querySelector('.navConfirmation__input').value
      if (name === '') return 0

      const { newProject, isStored } = this.projectModel.createProjects({ name })
      const id = newProject.id

      if (isStored) {
        this.view.renderProject({ div: this.projectsDiv, id, name, color: newProject.color })
        this.view.renderAddProjectButton({ div: this.projectsDiv })
        return true
      } else {
        console.error('Project Not Stored')
      }
    }

    // CANCEL BUTTON
    if (event.target.id === confirmationCancel) {
      this.view.renderAddProjectButton({ div: this.projectsDiv })
      return true
    }

    if (event.target.classList.contains(confirmationDiv)) {
      return true
    }

    return false
  }

  // Checks if we clicked a project
  _clickOnProject = (event) => {
    // get the container whatever we clikc container or element inside the container
    // like the title of the project.
    const projectContainer = event.target.classList.contains(navContainer) ? event.target : event.target.parentNode
    if (!projectContainer.classList.contains(navContainer)) return 0

    const projectsArr = this.projectModel.getAllProjects()

    const projectID = projectContainer.dataset.projectId
    const isClickedIdInArray = projectsArr.some(project => project.id === projectID)

    if (isClickedIdInArray) {
      // find the project that we clicked in the project array
      const project = projectsArr.find(project => project.id === projectID)
      this._projectLoad({ projectID, project })
      this.view.activePageStyle({ div: event.target })
    }
  }

  // Calls the filter functions to get all the tasks from our project
  // and call the render function.
  _projectLoad = ({ projectID, project }) => {
    let tasks = this.taskModel.getAllTasks()
    tasks = filterByProject({ tasks, projectID })
    const completedTasks = filterCompletedTasks({ tasks })
    const notCompletedTasks = filterNotCompletedTasks({ tasks })

    // array same size as completed tasks with the color of the project
    // as all the tasks are same project -> will have same color.
    const colorCompletedTasks = completedTasks.map(el => project.color)
    const colorNotCompletedTasks = notCompletedTasks.map(el => project.color)

    this.view.renderPage({
      div: this.mainDiv,
      completedTasks,
      notCompletedTasks,
      name: project.name,
      colorCompletedTasks,
      colorNotCompletedTasks
    })

    this.setCurrentProject({ projectId: projectID })
  }

  _deleteProjectClick = (event) => {
    const deleteProjectButton = event.target
    if (deleteProjectButton.classList.contains(projectDeleteButton)) {
      const projectElement = event.target.parentNode
      const projectID = projectElement.dataset.projectId

      // DELETE DATA
      const tasks = this.taskModel.getAllTasks()
      const projectTasks = filterByProject({ tasks, projectID })
      this.taskModel.deleteManyTasks({ tasksArray: projectTasks })
      this.projectModel.deleteProject({ id: projectID })

      // DELETE VIEW
      projectElement.remove()

      // If we delete the project currently rendered, then load Home page
      const currentProjectID = this.getCurrentProject()
      if (currentProjectID === projectID) {
        this.reloadSection({ loadHome: true })
      }

      // If we are in a section, reload the section.
      if (currentProjectID === null) {
        this.reloadSection({ loadHome: false })
      }

      return true
    }
  }

  _colorInput = (event) => {
    const colorInput = event.target
    if (colorInput.classList.contains(projectColor)) {
      const projectID = colorInput.parentNode.dataset.projectId
      const updateValue = colorInput.value

      this.projectModel.updateProject({
        id: projectID,
        updatedFields: {
          color: updateValue
        }
      })

      return true
    }
  }

  // This is just so we don't select the project when trying to
  // change the color of the color input.
  _colorInputClick = (event) => {
    const colorInput = event.target
    if (colorInput.classList.contains(projectColor)) {
      return true
    }
  }
}
