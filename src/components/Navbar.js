import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useUserContext } from './UserContext';

const pages = [
  {
    title: 'Inicio',
    page: ''
  },
  {
    title: 'Ayuda',
    page: '/'
  }
]
const options = [
  {
    title: 'Iniciar Sesion',
    page: 'login'
  },
  {
    title: 'Registrarse',
    page: 'register'
  }
]

const userSettings = [
  {
    title: 'Perfil',
    page: 'profile'
  },
  {
    title: 'Mis recetas',
    page: 'my-recipes'
  },
  {
    title: 'Crear receta',
    page: 'my-recipes/new'
  }
];

// TODO fijarme de agregar pagina de explicaciones
// TODO para pantallas chicas agregar un IconButton

const Navbar = () => {

  let navigate = useNavigate()

  const { user, logout } = useUserContext();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    
  }, [user])
  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily:"Lucida Handwriting" }}
          >
            Recetas del Mundo
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, paddingLeft: "150px" }}>
            {pages.map((option) => (
              <Button
                key={option.title}
                onClick={()=> navigate(`/${option.page}`)}
                sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}
              >
                {option.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ?
            <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userSettings.map((setting) => (
                  <MenuItem key={setting.title} onClick={()=> {
                    handleCloseUserMenu();
                    navigate(`/${setting.page}`);
                  }}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
                <MenuItem key="Cerrar Sesión" onClick={() => {
                  handleCloseUserMenu();
                  logout();
                }}>
                  <Typography textAlign="center">Cerrar Sesión</Typography>
                </MenuItem>
              </Menu> </> :
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {options.map((option) => (
                  <Button
                    key={option.title}
                    onClick={()=> navigate(`/${option.page}`)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {option.title}
                  </Button>
                ))}
              </Box>
            }
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar