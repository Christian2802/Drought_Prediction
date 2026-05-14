import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { Home } from './pages/home/Home'
import { PredictPage } from './pages/predictPage/PredictPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <div>
          <Header />
          <div>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path="/predict" element={<PredictPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
