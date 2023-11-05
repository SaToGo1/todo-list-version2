/* eslint-disable import/no-duplicates */
/* eslint-disable camelcase */

// CONSTANTS - add task bar - classes/Ids
import {
  // CONSTANTS - add task bar - classes/Ids
  mainAddTaskDiv,
  mainAddTaskButton,
  mainAddTaskInput,
  mainAddTaskIcon,
  mainAddTaskDiv_focus,

  // CONSTANTS - task - classes/Ids
  mainTaskIcon,
  mainTaskDate,
  mainTaskDelete,
  mainTaskClass,

  // CONSTANTS - task details - classes/Ids
  taskDetailTitle,
  taskDetailDescription,
  taskDetailIcon,
  taskDetailDate
} from '../../views/Layouts/main/mainPage'

import {
  HOME_SECTION,
  TODAY_SECTION,
  TOMORROW_SECTION,
  WEEK_SECTION,
  MONTH_SECTION
} from '../../constants/section-constants.js'

import * as dateFunctions from '../utils/date-functions/dateFunctions.js'

import debounce from '../utils/debounce'

export default class ControllerMain {
  constructor ({ view, taskModel, projectModel, getCurrentProject, getCurrentSection, reloadSection, reloadProject }) {
    // CLASSES
    this.view = view
    this.taskModel = taskModel
    this.projectModel = projectModel

    // CALLBAKCS
    this.getCurrentProjectID = getCurrentProject // get project id
    this.getCurrentSection = getCurrentSection // get section string
    this.reloadSection = reloadSection
    this.reloadProject = reloadProject

    // DOM
    this.mainDiv = document.querySelector('.main')

    // CONTROLL VARIABLES
    this._isDetailOpen = false
  }

  initializeControllerMain = () => {
    // FOCUS EVENT
    this.mainDiv.addEventListener('focusin', this._addTaskBarFocusOutline) // add task bar
    this.mainDiv.addEventListener('focusout', this._addTaskBarFocusOutline) // add task bar

    // CHANGE EVENT
    this.mainDiv.addEventListener('change', this._dateInputChange) // task date
    this.mainDiv.addEventListener('change', this._changeDateDetails) // details date

    // INPUT EVENT
    this.mainDiv.addEventListener('input', this._inputDetails) // task details

    // CLICK EVENT
    this.mainDiv.addEventListener('click', this._handleClick)
  }

  // FOCUS EVENT
  _addTaskBarFocusOutline = (event) => {
    if (event.target.id === mainAddTaskDiv ||
    event.target.id === mainAddTaskButton ||
    event.target.id === mainAddTaskInput ||
    event.target.id === mainAddTaskIcon) {
      if (event.type === 'focusin') {
        document.querySelector(`#${mainAddTaskInput}`).focus()
        document.querySelector(`#${mainAddTaskDiv}`).classList.add(mainAddTaskDiv_focus)
      } else if (event.type === 'focusout') {
        document.querySelector(`#${mainAddTaskDiv}`).classList.remove(mainAddTaskDiv_focus)
      }
    }
  }

  // CHANGE EVENT DATE
  _dateInputChange = (event) => {
    if (event.target.classList.contains(mainTaskDate)) {
      const updatedDate = event.target.value

      const taskDOM = event.target.parentNode
      const taskID = taskDOM.dataset.taskId
      const { isStored } = this.taskModel.getTask({ id: taskID })

      if (!isStored) {
        console.error('task not stored on change date')
        return true
      }

      this.taskModel.updateTask({
        id: taskID,
        updatedFields: {
          date: updatedDate
        }
      })

      this._saveDetails()
      this.reloadSection({})
      this._loadDetails()
      return true
    }
    return false
  }

  // CLICK EVENT
  _handleClick = (event) => {
    let eventExecuted = false

    // 1. ADD TASK
    eventExecuted = this._AddTask(event)
    if (eventExecuted) return 0

    // 2. COMPLETE TASK
    eventExecuted = this._completeTaskClick(event)
    if (eventExecuted) return 0

    // 3. DELETE TASK
    eventExecuted = this._deleteTaskClick(event)
    if (eventExecuted) return 0

    // CLICK ON DATE -> DON'T OPEN DETAILS
    if (event.target.classList.contains(mainTaskDate)) return 0

    // 4. CLICK ON THE TASK TO OPEN DETAILS
    eventExecuted = this._taskOpenDetailClick(event)
    if (eventExecuted) return 0

    // 5. CLICK INSIDE DETAILS
    eventExecuted = this._taskDetailClick(event)
    if (eventExecuted) return 0

    // If clicking out of details, remove details.
    this._removeDetails()
  }

  // 1. ADD TASK
  _AddTask = (event) => {
    // click on the + button on the ADD TASK BAR
    if (event.target.id === mainAddTaskButton ||
    event.target.id === mainAddTaskIcon) {
      const taskTitle = document.querySelector(`#${mainAddTaskInput}`).value
      if (taskTitle === '') return 0

      const projectID = this.getCurrentProjectID() // null or ID

      // by default return today so if we are in a project we get today.
      // also in month and week sections get the last day of week and month.
      const date = this._getDateBySection()

      const { newTask, isStored } = this.taskModel.createTask({ taskTitle, projectID, date })

      const { project } = this.projectModel.getProject({ id: projectID })

      if (isStored) {
        this.view.renderTask({ task: newTask, color: project?.color })
      } else {
        console.error('Task Not Stored')
      }
      return true
    }

    return false
  }

  // 2. COMPLETE TASK
  _completeTaskClick = (event) => {
    if (event.target.classList.contains(mainTaskIcon)) {
      const taskDOM = event.target.parentNode
      const taskID = taskDOM.dataset.taskId
      const { task, isStored } = this.taskModel.getTask({ id: taskID })

      if (!isStored) {
        console.error('task not stored')
        return true
      }

      const completed = task.completed
      const { updatedTask, isUpdated } = this.taskModel.updateTask({
        id: taskID,
        updatedFields: {
          completed: !completed
        }
      })

      if (!isUpdated) {
        console.error('task not updated')
        return true
      }

      const { project } = this.projectModel.getProject({ id: task.projectID })
      taskDOM.remove()
      this.view.renderTask({ task: updatedTask, color: project?.color })

      // Mark the task changed for 2 seconds.
      const element = document.querySelector(`[data-task-id="${taskID}"]`)
      element.classList.add('activeTask')
      setTimeout(() => {
        element.classList.remove('activeTask')
      }, 2000)

      this._reloadDetails()
      return true
    }
    return false
  }

  // 3. DELETE TASK
  _deleteTaskClick = (event) => {
    const deleteButton = event.target
    if (deleteButton.classList.contains(mainTaskDelete)) {
      const taskElement = deleteButton.parentNode
      const id = taskElement.dataset.taskId
      this.taskModel.deleteTask({ id })
      taskElement.remove()

      // if details is open close details
      if (this._isDetailsOpenById({ id })) this._removeDetails()
      return true
    }
    return false
  }

  _getDateBySection = () => {
    const section = this.getCurrentSection()

    switch (section) {
      case HOME_SECTION:
      case TODAY_SECTION:
        return dateFunctions.today()

      case TOMORROW_SECTION:
        return dateFunctions.tomorrow()

      case WEEK_SECTION:
        return dateFunctions.endOfWeek()

      case MONTH_SECTION:
        return dateFunctions.endOfMonth()

      default:
        return dateFunctions.today()
    }
  }

  // 4. CLICK ON THE TASK TO OPEN DETAILS
  _taskOpenDetailClick = (event) => {
    // click on task or son of task(text inside task div)
    const taskContainer = event.target.classList.contains(mainTaskClass) ? event.target : event.target.parentNode
    if (!taskContainer.classList.contains(mainTaskClass)) return false

    const taskID = taskContainer.dataset.taskId

    this._openTaskDetails({ id: taskID })
    this.view.activeTaskStyle({ div: taskContainer })
    return true
  }

  // 5. CLICK INSIDE DETAILS
  _taskDetailClick = (event) => {
    const classList = event.target.classList

    let containsTaskDetails = false
    for (let i = 0; i < classList.length; i++) {
      if (classList[i].startsWith('taskDetails')) {
        containsTaskDetails = true
        break
      }
    }

    if (!containsTaskDetails) return false

    this._clickCompleteDetails(event)
    return true
  }

  _clickCompleteDetails = (event) => {
    const completeDetails = event.target
    if (!completeDetails.classList.contains(taskDetailIcon)) return

    const taskID = completeDetails.parentNode.parentNode.dataset.taskId
    const { task, isStored } = this.taskModel.getTask({ id: taskID })

    if (!isStored) {
      console.error('task not stored')
      return true
    }

    const completed = task.completed
    const { updatedTask, isUpdated } = this.taskModel.updateTask({
      id: taskID,
      updatedFields: {
        completed: !completed
      }
    })

    if (!isUpdated) {
      console.error('task not updated')
      return true
    }

    this._saveDetails()
    this.reloadSection({})
    this.reloadProject()
    this._loadDetails()
  }

  // CHANGE EVENT DATE DETAILS
  _changeDateDetails = (event) => {
    const dateDetails = event.target
    if (!dateDetails.classList.contains(taskDetailDate)) return false

    const updatedDate = dateDetails.value

    const taskID = dateDetails.parentNode.dataset.taskId
    const { isStored } = this.taskModel.getTask({ id: taskID })

    if (!isStored) {
      console.error('task not stored on change date')
      return true
    }

    this.taskModel.updateTask({
      id: taskID,
      updatedFields: {
        date: updatedDate
      }
    })

    this._saveDetails()
    this.reloadSection({})
    this.reloadProject()
    this._loadDetails()
    return true
  }

  // INPUT EVENT DETAILS
  _inputDetails = (event) => {
    this._changeTitleDetails(event)
    this._changeDescriptionDetails(event)
  }

  _changeTitleDetails = debounce((event) => {
    const titleElement = event.target
    if (!titleElement.classList.contains(taskDetailTitle)) return

    const taskID = titleElement.dataset.taskId
    const title = titleElement.textContent

    const { updatedTask, isUpdated } = this.taskModel.updateTask({
      id: taskID,
      updatedFields: {
        title
      }
    })

    if (!isUpdated) {
      console.error('task title not updated')
      return
    }

    // Update the task in the task list
    this.view.updateTask({ task: updatedTask })
  }, 1000)

  _changeDescriptionDetails = debounce((event) => {
    const descriptionElement = event.target
    if (!descriptionElement.classList.contains(taskDetailDescription)) return false

    const taskID = descriptionElement.dataset.taskId
    const description = descriptionElement.textContent

    const { isUpdated } = this.taskModel.updateTask({
      id: taskID,
      updatedFields: {
        description
      }
    })

    if (!isUpdated) {
      console.error('task description not updated')
    }
  }, 1000)

  _openTaskDetails = ({ id }) => {
    const { task } = this.taskModel.getTask({ id })
    const projectArray = this.projectModel.getAllProjects()
    const { project } = this.projectModel.getProject({ id: task.projectID })

    // if details is open remove details and load new ones.
    const taskDetail = document.querySelector('.taskDetails__div')
    taskDetail?.remove()

    this.view.renderTaskDetail({ div: this.mainDiv, task, project, projectArray })
  }

  _saveDetails = () => {
    const taskDetailID = document.querySelector('.taskDetails__div')?.dataset.taskId
    if (taskDetailID === undefined) return
    this.detailsSaved = taskDetailID
  }

  _loadDetails = () => {
    if (this.detailsSaved === undefined) return

    // Open details
    this._openTaskDetails({ id: this.detailsSaved })

    // Active style of the task
    const taskContainer = document.getElementById(`${this.detailsSaved}`)
    this.view.activeTaskStyle({ div: taskContainer })

    this.detailsSaved = undefined
  }

  // not very efficient
  _reloadDetails = () => {
    this._saveDetails()
    this._loadDetails()
  }

  _removeDetails = () => {
    const taskDetail = document.querySelector('.taskDetails__div')
    taskDetail?.remove()

    // when closing the task also
    // remove active style from task
    this.view.activeTaskStyle({})
  }

  _isDetailsOpenById = ({ id }) => {
    const taskDetail = document.querySelector('.taskDetails__div')
    const taskId = taskDetail?.dataset.taskId

    if (taskId === undefined) return false
    if (taskId !== id) return false

    return true
  }
}
