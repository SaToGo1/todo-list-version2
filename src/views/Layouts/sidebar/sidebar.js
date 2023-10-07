import './sidebar.css'

// ICONS
import addProjectIcon from '../asset/plus.svg'
import projectTagIcon from '../asset/tag.svg'
import homeIcon from '../asset/home.png'
import todayIcon from '../asset/today.svg'
import weekIcon from '../asset/week.png'
import monthIcon from '../asset/month.png'

// CONSTANTS
import {
  // HOME_SECTION,
  TODAY_SECTION,
  TOMORROW_SECTION,
  WEEK_SECTION,
  MONTH_SECTION
} from '../../../constants/section-constants.js'

// CLASSES
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
    const clickClass = `navSection__${name}-click`
    const iconSrc = returnIconForSection({ name })
    sectionDiv += `
    <div class="${navContainer} ${clickClass}">
      <img src="${iconSrc}" class="${navIcon} ${clickClass}" alt="${name} button">
      <button class="${navButton} ${clickClass}">${name}</button>
    </div>`
  })

  sectionDiv += '</div>'

  div.innerHTML = sectionDiv
}

function returnIconForSection ({ name }) {
  if (name === TODAY_SECTION) return todayIcon
  else if (name === TOMORROW_SECTION) return projectTagIcon // change this
  else if (name === WEEK_SECTION) return weekIcon
  else if (name === MONTH_SECTION) return monthIcon

  // Return Home
  return homeIcon
}
/* ###########
   # Projects #
   ########### */
export const addProjectButtonClass = 'nav__addProjectButton'
export const addProjectIconClass = 'nav__addProjectIcon'
const addProjectButtonTemplate = () => {
  return `
  <button class="${addProjectButtonClass}" id="${addProjectButtonClass}">
    <img src="${addProjectIcon}" alt="add Project" class="${addProjectIconClass}" id="${addProjectIconClass}">
  </button>
  `
}

const confirmationDiv = 'nav__Confirmation'
const confirmationInput = 'navConfirmation__input'
export const confirmationAccept = 'navConfirmation__accept'
export const confirmationCancel = 'navConfirmation__cancel'
export function renderAddProjectConfirmation ({ div }) {
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

export const projectDeleteButton = 'nav__ProjectDeleteButton'
export const projectColor = 'nav_projectColor'
function projectTemplate ({ id, name, color = '#000000' }) {
  return `
  <div class="${navContainer}" data-project-id="${id}">
    <input type="color" class="${projectColor}" value="${color}">
    <button class="${navButton}">${name}</button>
    <button class="${projectDeleteButton}">X</button>
  </div>`
}

export function renderProject ({ div, id, name, color = '#000000' }) {
  const template = projectTemplate({ id, name, color })

  div.insertAdjacentHTML('beforeend', template)
}

export function renderAllProjects ({ div, projects }) {
  const addProjectButton = addProjectButtonTemplate()
  let projectDiv = `
    <h2>Projects</h2>
  `

  projects.forEach(project => {
    const template = projectTemplate({ id: project.id, name: project.name, color: project.color })
    projectDiv += `${template}`
  })

  projectDiv += `
    ${addProjectButton}
  `

  div.innerHTML = projectDiv
}

const navContainerActive = 'nav__container-active'
export function activePageStyle ({ div }) {
  // Delete the active class of the previous active page.
  const sidebarPages = document.querySelectorAll(`.${navContainer}`)
  sidebarPages.forEach(Page => Page.classList.remove(navContainerActive))

  let i = 5
  // if the element selected is not the div of the section or project
  // get the parent till we get the div of the section or project.
  while (!div.classList.contains(navContainer)) {
    div = div.parentNode
    // Security measure it should never get here
    i--
    if (i === 0) {
      console.error('Infinite bucle on activePageStyle')
      return 0
    }
  }

  // Add the active class to the current active Page.
  div.classList.add(navContainerActive)
}
