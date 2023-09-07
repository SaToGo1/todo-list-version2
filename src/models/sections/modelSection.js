import Section from './section.js'

export default class SectionModel {
  constructor () {
    this.sections = []
    this.initialize()
  }

  initialize () {
    const home = new Section({ name: 'Home' })
    const today = new Section({ name: 'Today' })
    const tomorrow = new Section({ name: 'Tomorrow' })
    const week = new Section({ name: 'Week' })
    const month = new Section({ name: 'Month' })

    this.sections = [home, today, tomorrow, week, month]
  }

  /**
  * Returns an array with all the names.
  * @returns {Array} An array containing all the names.
  */
  getSectionNames () {
    return this.sections.map(section => section.name)
  }
}
