import { ThemeProvider } from '@mui/material/styles'
import theme from "./themeConfig"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { UserProvider } from './components/UserContext'
import PrivateRoute from './components/PrivateRoute';


// TODO misma logica de privateroute con register
// TODO hacer otro componente

// TODO componente de Ayuda /help
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
            <Route path='/profile' element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
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