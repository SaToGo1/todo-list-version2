import 'normalize.css'
import './index.css'

import View from './src/views/view'
import Controller from './src/controller/controller'

const view = new View()

const controller = new Controller(view)

controller.initializeController() // does nothing right now.
