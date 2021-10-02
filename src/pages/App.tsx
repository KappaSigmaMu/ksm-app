import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { AccountContextProvider } from '../account/AccountContext'
import { Navbar } from '../components/Navbar'
import { GlobalStyle } from '../styles/globalStyle'
import { Theme } from '../styles/Theme'
import { SubstrateContextProvider, useSubstrate } from '../substrate'
import { CyborgGuide } from './CyborgGuide'
import { Home } from './home/Home'
import { LandingPage } from './LandingPage'
import { Welcome } from './Welcome'

const Main = () => {
  const { apiState, apiError } = useSubstrate()

  const loader = (text: string) => {
    return <p>{text}</p>
  }

  if (apiState === 'CONNECTING') return loader('Connecting')
  if (apiState === 'ERROR') return loader(`${JSON.stringify(apiError, null, 4)}`)
  if (apiState !== 'READY') return loader('Connecting')

  const defaultNavbarProps = {
    showAccount: true,
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar showSocialIcons {...defaultNavbarProps} />
            <LandingPage />
          </>
        }/>
        <Route path="/cyborg-guide" element={
          <>
            <Navbar showSocialIcons showGalleryButton {...defaultNavbarProps} />
            <CyborgGuide />
          </>
        }/>
        <Route path="/welcome" element={
          <>
            <Navbar showBrandIcon showGalleryButton {...defaultNavbarProps} />
            <Welcome />
          </>
        }/>
        <Route path="/home" element={
          <>
            <Navbar showBrandIcon showGalleryButton {...defaultNavbarProps} />
            <Home />
          </>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

const App = () => {
  return (
    <SubstrateContextProvider>
      <AccountContextProvider>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
            <StyledMain fluid>
              <Main />
          </StyledMain>
        </ThemeProvider>
      </AccountContextProvider>
    </SubstrateContextProvider>
  )
}

const StyledMain = styled(Container)`
`

export { App }
