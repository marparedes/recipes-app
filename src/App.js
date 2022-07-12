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
import CreateRecipe from './pages/CreateRecipe';
import Recipe from './pages/Recipe';
import MyRecipes from './pages/MyRecipes';
import EditRecipe from './pages/EditRecipe';
import { PasswordRecovery } from './pages/PasswordRecovery';
import { Footer } from './components/Footer';
import { Container } from './components/Container';


// TODO componente de Ayuda /help
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Container>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/recipes/:id' element={<Recipe />} />
              <Route path='/password-recovery' element={<PasswordRecovery />} />
              <Route path='/profile' element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              <Route path='/my-recipes' element={
                <PrivateRoute>
                  <MyRecipes />
                </PrivateRoute>
              } />
              <Route path='/my-recipes/:id' element={
                <PrivateRoute>
                  <EditRecipe />
                </PrivateRoute>
              } />
              <Route path='/my-recipes/new' element={ // TODO: se podría mover a "Mis Recetas" cuando esa sección sea implementada

                //<PrivateRoute> TODO: hacer privado
                <CreateRecipe />
                //</PrivateRoute>
              } />
              {/* <Route path='recipes' element={}>
              <Route path=':recipeId' element={}/>
              <Route path='new' element={}/>
            */}
            </Routes>
            {/*<Footer />*/}
          </Container>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App; 