import { ThemeProvider } from '@mui/material/styles'
import theme from "./themeConfig"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { UserProvider } from './components/UserContext'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            {/* <Route path='recipes' element={}>
              <Route path=':recipeId' element={}/>
              <Route path='new' element={}/>
            */}
          </Routes>
        </UserProvider>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App; 