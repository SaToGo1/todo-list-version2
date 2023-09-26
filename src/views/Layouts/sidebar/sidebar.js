import './sidebar.css'
import addProjectIcon from './asset/plus.svg'

const sectionsClass = 'nav__sectionsDiv'
const projectsClass = 'nav__projectsDiv'

const navClass = 'nav'
const navHrClass = 'nav__hr'

export function sidebarTemplate () {
  const addProjectButton = addProjectButtonTemplate()

  return (`
    <nav class="${navClass}">
      <div class="${sectionsClass}">
        <h2>Sections</h2>
      </div>
      <hr class="${navHrClass}">
      <div class="${projectsClass}">
        <h2>Projects</h2>
        ${addProjectButton}
      </div>
    </nav>
  `)
}

/* ###########
   # Sections #
   ########### */
export function sidebarSectionRender ({ div, sectionNames }) {
  let sectionDiv = `
    <div class="${sectionsClass}">
      <h2>Sections</h2>
  `
  sectionNames.forEach(name => {
    const id = `navSection__button-${name}`
    sectionDiv += `<button id=${id}>${name}</button>`
  })

  sectionDiv += '</div>'

  div.innerHTML = sectionDiv
}

/* ###########
   # Projects #
   ########### */
const addProjectButtonTemplate = () => {
  const classButton = 'nav__addProjectButton'
  const idButton = 'addProject'

  const classIcon = 'nav__addProjectIcon'
  return `
  <button class="${classButton}" id="${idButton}">
    <img src="${addProjectIcon}" alt="addProject" class="${classIcon}">
  </button>
  `
}

const confirmationDiv = 'nav__Confirmation'
const confirmationInput = 'navConfirmation__input'
const confirmationAccept = 'navConfirmation__accept'
const confirmationCancel = 'navConfirmation__cancel'
export function addProjectConfirmationRender ({ div }) {
  const template = `
  <div class="${confirmationDiv}">
    <label>Project Name:</label>
    <input type="text" class="${confirmationInput}" maxlength="20" minlength="1">
    <button class="${confirmationAccept}">Accept</button>
    <button class="${confirmationCancel}">Cancel</button
  </div>`

  const button = document.querySelector('.nav__addProjectButton')
  if (button) {
    div.removeChild(button)
    div.insertAdjacentHTML('beforeend', template)
  } else {
    console.error('Add Project button not found, sidebar.js')
  }
}
