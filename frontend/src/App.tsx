import { Route, Routes } from 'react-router-dom'
import { Paths } from './config/routes'
import Home from './pages/home/Home'
import Login from './pages/authentication/login/Login'
import Register from './pages/authentication/register/Register'
import { Toaster } from 'react-hot-toast'
import AppProviders from './AppProviders'

function App() {
  return (
    <>
      <AppProviders>
        <Routes>
          <Route path={Paths.HOME} element={<Home />} />
          <Route path={Paths.LOGIN} element={<Login />} />
          <Route path={Paths.REGISTER} element={<Register />} />
        </Routes>

        <Toaster
          position="bottom-right"
        />
      </AppProviders>
    </>
  )
}

export default App
