import Button from '@mui/material/Button'
import React, { useEffect, useRef, useState } from 'react'
import { useUserContext } from '../components/UserContext'
import { TextField, Typography } from '@mui/material';
import '../styles/index.css';
import { Box } from '@mui/system';
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { login } = useUserContext()
  const history = useNavigate();

  const errRef = useRef();
  const userRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!((email === 'hsimpson@gmail.com') && (password === '123'))) {
      setErrorMessage("No se encontró ningún usuario con esas credenciales");
      return;
    }
    const id = "userId";
    setEmail('');
    setPassword('');
    setErrorMessage('');
    login({ id, email })
    history('/');
  }

  return (
    <div className={'login-form'}>
      <Typography variant='h3' className={'page-title'}>Iniciar sesión</Typography>

      <Box className={'box'} sx={{
        height: 300,
        margin: 'auto',
        width: '80%',
      }}>
        <form onSubmit={handleSubmit}>
          <div className={'form-text-field'}>
            <p className={'field-name'}>E-mail</p>
            <TextField className={'form-field'}
              id="email"
              ref={userRef}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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