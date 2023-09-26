export default class ControllerSection {
  constructor ({ view, sectionModel }) {
    this.view = view
    this.sectionModel = sectionModel
    this.sectionDiv = document.querySelector('.nav__sectionsDiv')
  }

  initializeControllerSection () {
    const sectionNames = this.sectionModel.getSectionNames()
    this.view.renderSections({ div: this.sectionDiv, sectionNames })

    // eventclick
  }
}
