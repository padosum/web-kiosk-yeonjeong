import styled from 'styled-components'
import Main from './components/pages/Main'
import GlobaStyle from './GlobalStyle'

function App() {
  return (
    <>
      <GlobaStyle />
      <AppTitle>
        <Image src="/images/logo.png" alt="logo"></Image>우아 키오스크
      </AppTitle>
      <MainPageLayout className="App">
        <Main />
      </MainPageLayout>
    </>
  )
}

const MainPageLayout = styled.div`
  width: 76.8rem;
  height: 80rem;
  background: #4b4b56;
  border-radius: 10px;
  border: 4px solid #353535;
  position: relative;
  padding: 1.5rem;
  margin: auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 2fr 1fr;
  grid-template-areas:
    'items cash'
    'cart payment';

  ::before {
    display: block;
    content: '';
    width: 90%;
    height: 4px;
    margin: auto;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    top: 0.5%;
    left: 2.5rem;
    position: absolute;
  }
`

const Image = styled.img`
  width: 32px;
  height: 32px; ;
`

const AppTitle = styled.h1`
  display: flex;
  align-items: center;
`

export default App
