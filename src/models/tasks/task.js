export default class Task {
  constructor (id, projectID = null, title, description = '', date = '', completed = false) {
    this.id = id
    this.projectID = projectID
    this.title = title
    this.description = description
    this.date = date
    this.completed = completed
  }
}
