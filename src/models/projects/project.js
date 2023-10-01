export default class Project {
  constructor ({ id, name, color = 'default' }) {
    this.id = id
    this.name = name
    this.color = color
  }
}
