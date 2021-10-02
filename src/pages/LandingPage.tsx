import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Canary from '../static/canary.svg'
import KappaSigmaMuTitle from '../static/kappa-sigma-mu-title.svg'
import { useAccount } from '../account/AccountContext'

const LandingPage = () => {
  const { activeAccount } = useAccount()

  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/welcome')
  }

  return (
    <>
      <FullPageHeightRow>
        <Col xs={6}>
          <CanaryImg src={Canary} alt="Canary" />
        </Col>
        <CentralizedCol xs={6}>
          <h1>Join the</h1>
          <KappaSigmaMu src={KappaSigmaMuTitle} alt="Kappa Sigma Mu Title" />
          <Button disabled={!activeAccount} variant="primary" size="lg" onClick={handleClick}>
            Become a Cyborg
          </Button>
          <GuideButton variant="link" href="/cyborg-guide">
            Cyborg Guide
          </GuideButton>
        </CentralizedCol>
      </FullPageHeightRow>
    </>
  )
}

const KappaSigmaMu = styled.img`
  margin: 50px 0;
  display: block;
`

const CanaryImg = styled.img`
  position: absolute;
  bottom: 30px;
  height: 90vh;
`

const FullPageHeightRow = styled(Row)`
  height: 91.7vh;
`

const CentralizedCol = styled(Col)`
  align-items: center;
  margin-bottom: auto;
  margin-top: auto;
  z-index: 1;
`

const GuideButton = styled(Button)`
  position: absolute;
  bottom: 30px;
  display: flex;
`

export { LandingPage }
