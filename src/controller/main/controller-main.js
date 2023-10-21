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
  mainTaskClass
} from '../../views/Layouts/main/mainPage'

import {
  HOME_SECTION,
  TODAY_SECTION,
  TOMORROW_SECTION,
  WEEK_SECTION,
  MONTH_SECTION
} from '../../constants/section-constants.js'

import * as dateFunctions from '../date-functions/dateFunctions.js'

export default class ControllerMain {
  constructor ({ view, taskModel, projectModel, getCurrentProject, getCurrentSection, reloadSection }) {
    // CLASSES
    this.view = view
    this.taskModel = taskModel
    this.projectModel = projectModel

    // CALLBAKCS
    this.getCurrentProjectID = getCurrentProject // get project id
    this.getCurrentSection = getCurrentSection // get section string
    this.reloadSection = reloadSection

    // DOM
    this.mainDiv = document.querySelector('.main')

    // CONTROLL VARIABLES
    this._isDetailOpen = false
  }

  initializeControllerMain = () => {
    this.mainDiv.addEventListener('focusin', this._addTaskBarFocusOutline)
    this.mainDiv.addEventListener('focusout', this._addTaskBarFocusOutline)

    this.mainDiv.addEventListener('click', this._handleClick)

    this.mainDiv.addEventListener('change', this._dateInputChange)
  }

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

  _handleClick = (event) => {
    let eventExecuted = false

    // ADD TASK
    eventExecuted = this._AddTask(event)
    if (eventExecuted) return 0

    // COMPLETE TASK
    eventExecuted = this._completeTaskClick(event)
    if (eventExecuted) return 0

    // DELETE TASK
    eventExecuted = this._deleteTaskClick(event)
    if (eventExecuted) return 0

    // CLICK ON THE TASK TO OPEN DETAILS
    eventExecuted = this._taskOpenDetailClick(event)
    if (eventExecuted) return 0

    // DetailClicks
    eventExecuted = this._taskDetailClick(event)
    if (eventExecuted) return 0

    this._removeDetails()
  }

  _taskDetailClick = (event) => {
    const classList = event.target.classList

    let containsTaskDetails = false
    for (let i = 0; i < classList.length; i++) {
      if (classList[i].startsWith('taskDetails__')) {
        containsTaskDetails = true
        break
      }
    }

    if (!containsTaskDetails) return false
    return true
  }

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

      // const { updatedTask, isUpdated } =
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

  _deleteTaskClick = (event) => {
    const deleteButton = event.target
    if (deleteButton.classList.contains(mainTaskDelete)) {
      const taskElement = deleteButton.parentNode
      const id = taskElement.dataset.taskId
      this.taskModel.deleteTask({ id })
      taskElement.remove()
      return true
    }
    return false
  }

  _taskOpenDetailClick = (event) => {
    // click on task or son of task(text inside task div)
    const taskContainer = event.target.classList.contains(mainTaskClass) ? event.target : event.target.parentNode
    if (!taskContainer.classList.contains(mainTaskClass)) return false

    const taskID = taskContainer.dataset.taskId

    this._openTaskDetails({ id: taskID })
    return true
  }

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
    this._openTaskDetails({ id: this.detailsSaved })
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
  }
}
