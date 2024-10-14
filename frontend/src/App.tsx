import { Navigate, Route, Routes } from 'react-router-dom'
import { Paths } from './config/routes'
import Home from './pages/home/Home'
import Login from './pages/authentication/login/Login'
import Register from './pages/authentication/register/Register'
import { Toaster } from 'react-hot-toast'
import AppProviders from './AppProviders'
import { EditProfile } from './pages/editProfile/EditProfile'
import { GeneralEdit } from './pages/editProfile/general/GeneralEdit'
import { Contacts } from './pages/editProfile/contacts/Contacts'

function App() {
  return (
    <>
      <AppProviders>
        <Routes>
          <Route path={Paths.HOME} element={<Home />} />
          <Route path={Paths.LOGIN} element={<Login />} />
          <Route path={Paths.REGISTER} element={<Register />} />
          <Route path={Paths.EDIT_PROFILE} element={<EditProfile />}>
            <Route index element={<Navigate to="general" replace />} />
            <Route path="general" element={<GeneralEdit />} />
            <Route path="contacts" element={<Contacts />} />
          </Route>
        </Routes>

        <Toaster
          position="bottom-right"
        />
      </AppProviders>
    </>
  )
}

export default App
