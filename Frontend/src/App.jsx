import { Navigate, Route, Routes } from 'react-router-dom'
import {useSelector} from 'react-redux'
import './App.css'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'



function App() {
  const user = useSelector((state) => state.authReducer.authData);


  return (
    <>
      <div className='App'>
        <div className='blur' style={{ top: '-2%', right: '0'}}></div>
        <div className='blur' style={{ top: '56%', left: '-8rem' }}></div>

        <Routes>
          <Route path='/' element={user? <Navigate to="home"/> : <Navigate to='auth'/>}/>
          <Route path='/home' element={user? <Home/> : <Navigate to="../auth"/> }/>
          <Route path='/auth' element={user? <Navigate to='../home'/> : <Auth/>} />
          <Route path='/profile/:id' element={user ? <Profile/> : <Navigate to='../auth'/>}/>

        </Routes>
      </div>

    
    </>
  )
}

export default App
