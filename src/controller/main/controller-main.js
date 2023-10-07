/* eslint-disable import/no-duplicates */
/* eslint-disable camelcase */

// CONSTANTS - add task bar - classes/Ids
import {
  mainAddTaskDiv,
  mainAddTaskButton,
  mainAddTaskInput,
  mainAddTaskIcon,
  mainAddTaskDiv_focus
} from '../../views/Layouts/main/mainPage'

// CONSTANTS - task - classes/Ids
import {
  mainTaskIcon,
  mainTaskDate,
  mainTaskDelete
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
    this._AddTask(event)
    this._completeTaskClick(event)
    this._deleteTaskClick(event)
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
    }
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
        return 0
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
        return 0
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
    }
  }

  _dateInputChange = (event) => {
    if (event.target.classList.contains(mainTaskDate)) {
      const updatedDate = event.target.value

      const taskDOM = event.target.parentNode
      const taskID = taskDOM.dataset.taskId
      const { isStored } = this.taskModel.getTask({ id: taskID })

      if (!isStored) {
        console.error('task not stored on change date')
        return 0
      }

      // const { updatedTask, isUpdated } =
      this.taskModel.updateTask({
        id: taskID,
        updatedFields: {
          date: updatedDate
        }
      })

      this.reloadSection({})
    }
  }

  _deleteTaskClick = (event) => {
    const deleteButton = event.target
    if (deleteButton.classList.contains(mainTaskDelete)) {
      const taskElement = deleteButton.parentNode
      const id = taskElement.dataset.taskId
      this.taskModel.deleteTask({ id })
      taskElement.remove()
    }
  }
}
