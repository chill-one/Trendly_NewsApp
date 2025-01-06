//"rafce" is a shortcut to generate a functional component

// npm install react-router-dom
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, Technology, Science, Sport } from './pages';
import { NewsProvider } from './context/Context';

const App = () => {
  return (
    <main className='bg-slate-300/20'>
      <Router>
        <Navbar/>
        <NewsProvider>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route
            path='/*'
            element={
              <>
                <Routes>
                  <Route path='/science' element={<Science />} />
                  <Route path='/sports' element={<Sport />} />
                  <Route path='/technology' element={<Technology />} />
                </Routes>
              </>
            }
            />
        </Routes>
        </NewsProvider>
      </Router>
    </main>
  )
}

export default App