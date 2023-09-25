// IDEA
// model.js
// import TaskModel from './tasks/taskmodel.js'
import ProjectModel from './projects/model-project.js'
import SectionModel from './sections/model-section.js'

const sectionModel = new SectionModel()
const projectModel = new ProjectModel()

export {
//   TaskModel,
  projectModel,
  sectionModel
}
