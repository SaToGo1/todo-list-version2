import './header.css'

export function headerTemplate () {
  const headerClass = 'header'
  const h1Class = 'header__h1'

  return (`
    <header class="${headerClass}">
      <h1 class="${h1Class}">To-Do List V2</h1>
    </header>
  `)
}
