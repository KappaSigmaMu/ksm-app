import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    color: white;
  }

  html {
    background-color: #212529;
    font-family: Roboto, sans-serif !important;
    font-style: normal;
  }

  body {
    background-color: #212529;
  }

  h1 {
    font-size: 36px;
    font-weight: bold;
  }

  h4 {
    font-size: 16px;
    font-weight: bold;
  }

  h2, h3, h4, h5 {
    color: white;
  }

  a {
    color: #01ffff;
  }

  p {
    color: #c4c4c4;
  }
`

export { GlobalStyle }
