import './sidebar.css'

const sectionsClass = 'nav__sectionsDiv'
const projectsClass = 'nav__projectsDiv'

export function sidebarTemplate () {
  const navClass = 'nav'
  const navHrClass = 'nav__hr'

  return (`
    <nav class="${navClass}">
      <div class="${sectionsClass}">
        <h2>Sections</h2>
      </div>
      <hr class="${navHrClass}">
      <div class="${projectsClass}">
        <h2>Projects</h2>
      </div>
    </nav>
  `)
}

export function sidebarSectionTemplate ({ divDom, sectionNames }) {
  let sectionDiv = `
    <div class="${sectionsClass}">
      <h2>Sections</h2>
  `
  sectionNames.forEach(name => {
    sectionDiv += `<button>${name}</button>`
  })

  sectionDiv += '</div>'

  divDom.innerHTML = sectionDiv
}
