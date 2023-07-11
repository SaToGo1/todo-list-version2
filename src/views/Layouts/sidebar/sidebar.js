import './sidebar.css'

export function sidebarTemplate () {
  const navClass = 'nav'
  const navHrClass = 'nav__hr'

  return (`
    <nav class="${navClass}">
      <p>Sections</p>
      <hr class="${navHrClass}">
      <p>Projects</p>
    </nav>
  `)
}
