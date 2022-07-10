import Button from '@mui/material/Button'
import React, { useEffect, useRef, useState } from 'react'
import { useUserContext } from '../components/UserContext'
import { TextField, Typography } from '@mui/material';
import '../styles/index.css';
import { Box } from '@mui/system';
import { Link, useNavigate } from "react-router-dom";
import urlWebServices from '../webServices';

function Login() {
  const { login } = useUserContext()
  const history = useNavigate();

  const errRef = useRef();
  const userRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    const response = await fetch(urlWebServices.login, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Origin': 'http://localhost:3000',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData,
    });
    const parsedResponse = await response.json();
    if (response.status !== 200) {
      setErrorMessage("No se encontró ningún usuario con esas credenciales");
      return;
    }
    setUsername('');
    setPassword('');
    setErrorMessage('');
    login({ id: parsedResponse.data.user._id, token: parsedResponse.data.token, username: parsedResponse.data.user.username });
    history('/');
  }

  return (
    <div className={'login-form'}>
      <Box sx={{
        margin: 'auto',
        width: '80%',
      }}>
      <Typography variant='h4' className={'page-title'}>Iniciar sesión</Typography>

        <form onSubmit={handleSubmit}>
          <div className={'form-text-field'}>
            <p className={'field-name'}>Nombre de usuario</p>
            <TextField className={'form-field'}
              id="username"
              ref={userRef}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required={true}
            />
          </div>

          <div className={'form-text-field'}>
            <p className={'field-name'}>Contraseña</p>
            <TextField className={'form-field'}
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required={true}
            />
          </div>
          <Typography className={errorMessage ? "error-message centered-text" : "hidden"} hidden={!errorMessage} ref={errRef} aria-live="assertive">{errorMessage}</Typography>
          <Link to={"/password-recovery"}>
            <Typography sx={{ textAlign: "center", marginTop: "15px" }}>¿Olvidaste tu contraseña?</Typography>
          </Link>
          <div className='form-button'>
            <Button type="submit" variant="contained" className={'save-button'}>Iniciar Sesion</Button>
          </div>
        </form>
      </Box>
    </div>
  )
}

export default Login