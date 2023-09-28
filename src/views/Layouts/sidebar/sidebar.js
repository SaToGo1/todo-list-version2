import './sidebar.css'
import addProjectIcon from './asset/plus.svg'
import projectTag from './asset/tag.svg'

const sectionsClass = 'nav__sectionsDiv'
const projectsClass = 'nav__projectsDiv'

const navClass = 'nav'
const navHrClass = 'nav__hr'

const navContainer = 'nav__container'

const navIcon = 'nav__icon'
const navButton = 'nav__button'
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
  `
  sectionNames.forEach(name => {
    const id = `navSection__${name}`
    sectionDiv += `<button class="${navContainer}" id=${id}>${name}</button>`
  })

  sectionDiv += '</div>'

  div.innerHTML = sectionDiv
}

/* ###########
   # Projects #
   ########### */
const addProjectButtonTemplate = () => {
  const classButton = 'nav__addProjectButton'

  const classIcon = 'nav__addProjectIcon'
  return `
  <button class="${classButton}" id="${classButton}">
    <img src="${addProjectIcon}" alt="addProject" class="${classIcon}" id="${classIcon}">
  </button>
  `
}

export function renderAddProjectConfirmation ({ div }) {
  const confirmationDiv = 'nav__Confirmation'
  const confirmationInput = 'navConfirmation__input'
  const confirmationAccept = 'navConfirmation__accept'
  const confirmationCancel = 'navConfirmation__cancel'

  const template = `
  <div class="${confirmationDiv}">
    <label>Project Name:</label>
    <input type="text" class="${confirmationInput}" maxlength="40" minlength="1">
    <button class="${confirmationAccept} ${navButton}" id="${confirmationAccept}">Accept</button>
    <button class="${confirmationCancel} ${navButton}" id="${confirmationCancel}">Cancel</button
  </div>`

  const button = document.querySelector('.nav__addProjectButton')
  if (button) {
    div.removeChild(button)
    div.insertAdjacentHTML('beforeend', template)
  } else {
    console.error('Add Project button not found, sidebar.js')
  }
}

export function renderAddProjectButton ({ div }) {
  const addProjectButton = addProjectButtonTemplate()
  const confirmationDiv = document.querySelector('.nav__Confirmation')
  if (confirmationDiv) {
    div.removeChild(confirmationDiv)
    div.insertAdjacentHTML('beforeend', addProjectButton)
  } else {
    console.error('Confirmation Div not found, sidebar.js')
  }
}

export function renderProject ({ div, id, name }) {
  const template = `
  <div class="${navContainer}" data-project-id="${id}">
    <img src="${projectTag}" alt="Project color: ..." class="${navIcon}">
    <button class="${navButton}">${name}</button>
  </div>`

  div.insertAdjacentHTML('beforeend', template)
}
