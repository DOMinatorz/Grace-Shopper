import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import AllBracelets from './components/all-bracelets'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <AllBracelets /> */}
      <Routes />
    </div>
  )
}

export default App
