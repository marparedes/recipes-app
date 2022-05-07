import Button from '@mui/material/Button'
import React, { useEffect, useRef, useState } from 'react'
import { useUserContext } from '../components/UserContext'
import { TextField } from '@mui/material';
import '../styles/index.css';
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useUserContext()
  const history = useNavigate();

  const errRef = useRef();
  const userRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!((user === 'foo') && (password === 'bar'))) {
      console.log("FAIL");
      setErrorMessage("Credenciales incorrectas");
      return;
    }
    setSuccess(true);
    const id = "userId";
    setUser('');
    setPassword('');
    setErrorMessage('');
    login({id, user})
    history('/');
  }

  return (
    <div className={'login-form'}>
      <h2 className={'page-title'}>Iniciar sesión</h2>

      <Box className={'box'} sx={{
        height: 300,
        margin: 'auto',
        width: '80%',
      }}>
        <form onSubmit={handleSubmit}>
          <div className={'form-text-field'}>
            <p className={'field-name'}>Nombre</p>
            <TextField className={'form-field'}
                       id="username"
                       ref={userRef}
                       onChange={(e) => setUser(e.target.value)}
                       value={user}
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
          <br></br>
          <p className="error-message" hidden={!errorMessage} ref={errRef} aria-live="assertive">{errorMessage}</p>
          <Button type="submit" variant="contained" className={'save-button'}>Iniciar Sesion</Button>
        </form>
      </Box>
    </div>
  )
}

export default Login