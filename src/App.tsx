import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './component/Home'
import Details from './component/Details'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:id' element={<Details />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
