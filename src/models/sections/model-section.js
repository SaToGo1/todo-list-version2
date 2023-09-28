import Section from './section.js'
import * as SectionConstants from '../../constants/section-constants.js'

export default class SectionModel {
  constructor () {
    this.sections = []
    this.initialize()
  }

  initialize () {
    const home = new Section({ name: SectionConstants.HOME_SECTION })
    const today = new Section({ name: SectionConstants.TODAY_SECTION })
    const tomorrow = new Section({ name: SectionConstants.TOMORROW_SECTION })
    const week = new Section({ name: SectionConstants.WEEK_SECTION })
    const month = new Section({ name: SectionConstants.MONTH_SECTION })

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
