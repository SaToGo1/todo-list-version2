// IDEA
// model.js
// import TaskModel from './tasks/taskmodel.js'
import ProjectModel from './projects/model-project.js'
import SectionModel from './sections/model-section.js'
import TaskModel from './tasks/model-task.js'

const sectionModel = new SectionModel()
const projectModel = new ProjectModel()
const taskModel = new TaskModel()

export {
  projectModel,
  sectionModel,
  taskModel
}
