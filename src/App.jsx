
import './App.css'

import HeadTitle from './Components/MainHeader';
import { Container } from '@mui/material';

function App() {

  return (
    <>
      <div style={{display:"flex", justifyContent:"center", width:"100vw"}}>
      <Container maxWidth="lg">
      <HeadTitle/>
      </Container>
      </div>
      
    </>
  )
}

export default App
