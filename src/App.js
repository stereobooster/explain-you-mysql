import React, { Component } from 'react'

import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import theme from './toolbox/theme.js'
import './toolbox/theme.css'

import Button from 'react-toolbox/lib/button/Button'

// import { SyntaxError, parse } from './mysql_response'

// let textarea = document.getElementById("input")
// let result = document.getElementById("result")

// let handleChange = () => {
//   try {
//     result.textContent = parse(textarea.value)
//     console.log(parse(textarea.value))
//   } catch (e) {
//     console.log(e)
//   }
// }

// textarea.addEventListener("change", handleChange)
// textarea.addEventListener("click", handleChange)
// textarea.addEventListener("keyup", handleChange)

class App extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <Button>Hello world</Button>
      </ThemeProvider>
    )
  }
}

export default App
