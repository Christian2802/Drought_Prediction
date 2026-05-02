import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'

function App() {

  return (
    <>
      <BrowserRouter>
        <div>
          <Header />
          <div>
            <Routes>
              <Route path='/'/>
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
