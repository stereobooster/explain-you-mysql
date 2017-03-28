// import App from './App';
import './index.css';

import { SyntaxError, parse } from './mysql_response'

let textarea = document.getElementById("input")
let result = document.getElementById("result")

let handleChange = () => {
  try {
    result.textContent = parse(textarea.value)
    console.log(parse(textarea.value))
  } catch (e) {
    console.log(e)
  }
}

textarea.addEventListener("change", handleChange)
textarea.addEventListener("click", handleChange)
textarea.addEventListener("keyup", handleChange)
