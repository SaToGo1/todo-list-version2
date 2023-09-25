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
export function sidebarSectionTemplate ({ divDom, sectionNames }) {
  let sectionDiv = `
    <div class="${sectionsClass}">
      <h2>Sections</h2>
  `
  sectionNames.forEach(name => {
    const id = `navSection__button-${name}`
    sectionDiv += `<button id=${id}>${name}</button>`
  })

  sectionDiv += '</div>'

  divDom.innerHTML = sectionDiv
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
