import * as SectionConstants from '../../constants/section-constants.js'

export default class ControllerSection {
  constructor ({ view, sectionModel }) {
    this.view = view
    this.sectionModel = sectionModel
    this.sectionDiv = document.querySelector('.nav__sectionsDiv')
  }

  initializeControllerSection = () => {
    const sectionNames = this.sectionModel.getSectionNames()
    this.view.renderSections({ div: this.sectionDiv, sectionNames })

    // eventclick
    this.sectionDiv.addEventListener('click', this._SectionDivHandler)
  }

  _SectionDivHandler = (event) => {
    switch (event.target.id) {
      case `navSection__${SectionConstants.HOME_SECTION}`:
        console.log('Home Clicked')
        break

      case `navSection__${SectionConstants.TODAY_SECTION}`:
        console.log('Today Clicked')
        break

      case `navSection__${SectionConstants.TOMORROW_SECTION}`:
        console.log('Tomorrow Clicked')
        break

      case `navSection__${SectionConstants.WEEK_SECTION}`:
        console.log('Week Clicked')
        break

      case `navSection__${SectionConstants.MONTH_SECTION}`:
        console.log('Month Clicked')
        break

      default:
        break
    }
  }
}
