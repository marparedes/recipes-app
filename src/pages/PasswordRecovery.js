import { Alert, AlertTitle, Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { RecoveryVerification } from '../components/RecoveryVerification';

export const PasswordRecovery = () => {

  const [emailIsCorrect, setEmailIsCorrect] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');

  const errRef = useRef();
  const userRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== 'hsimpson@gmail.com') {
      setErrorMessage("No se encontró ningún usuario registrado con ese e-mail");
      return
    }
    setEmailIsCorrect(true)
  }


  return <>
    <div>
      <Typography variant='h4' sx={{ margin: 10, textAlign: "center" }}>Recupera tu contraseña</Typography>

      {!emailIsCorrect ?
        <Box className={'box'} sx={{
          height: 300,
          margin: 'auto',
          width: '80%',
        }}>
          <form onSubmit={handleSubmit}>
            <div className={'form-text-field'}>
              <p className={'field-name'}>Ingresa tu e-mail para recuperarla</p>
              <TextField className={'form-field'}
                id="email"
                ref={userRef}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required={true}
              />
            </div>

            <Typography className="error-message" hidden={!errorMessage} ref={errRef} aria-live="assertive">{errorMessage}</Typography>
            <div className='recovery-button'>
              <Button type="submit" variant="contained">Iniciar Sesion</Button>
            </div>
          </form>
        </Box> : <Box className={'box'} sx={{
          height: 300,
          margin: 'auto',
          width: '300px',
        }}>
          <Alert severity="success" >
            <AlertTitle>Enviado</AlertTitle>
            Te enviamos un e-mail para recuperar tu contraseña
          </Alert>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
              <Button>Ir al inicio</Button>
            </Link>
          </div>
        </Box>}
    </div>
  </>
}
