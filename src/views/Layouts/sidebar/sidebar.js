import './sidebar.css'

export function sidebarTemplate () {
  const navClass = 'nav'
  const navHrClass = 'nav__hr'

  return (`
    <nav class="${navClass}">
      <h2>Sections</h2>
      <hr class="${navHrClass}">
      <h2>Projects</h2>
    </nav>
  `)
}
