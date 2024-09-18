import { Route, Routes } from 'react-router-dom'
import { Paths } from './config/routes'
import Home from './pages/home/Home'
import Login from './pages/authentication/login/Login'
import Register from './pages/authentication/register/Register'

function App() {
  return (
    <>
    <Routes>
      <Route path={Paths.HOME} element={<Home />}/>
      <Route path={Paths.LOGIN} element={<Login />}/>
      <Route path={Paths.REGISTER} element={<Register />}/>
    </Routes>
    </>
  )
}

export default App
