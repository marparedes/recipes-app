import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { AlertMessage } from '../components/AlertMessage';
import urlWebServices from '../webServices';

export const PasswordRecovery = () => {

  const [emailWasSent, setEmailWasSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [requestOngoingMessage, setRequestOngoingMessage] = useState('');
  const [username, setUsername] = useState('');

  const errRef = useRef();
  const userRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append('username', username);
    setRequestOngoingMessage('Enviando solicitud...');
    const response = await fetch(urlWebServices.postResetPassword, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/form-data',
        'Origin': 'http://localhost:3000',
      },
      body: formData,
    }).catch((err) => console.log(err));
    setRequestOngoingMessage('');
    if (response.status === 200) {
      setEmailWasSent(true)
      return;
    }
    const parsedResponse = await response.json();
    setErrorMessage(parsedResponse.message);
    throw new Error(`No se pudo enviar un email con la nueva contraseña: ${parsedResponse.message}`);
  }

  return <>
    <div>
      <Typography variant='h4' sx={{ margin: 10, textAlign: "center" }}>Recupera tu contraseña</Typography>

      {!emailWasSent ?
        <Box className={'box'} sx={{
          height: 300,
          margin: 'auto',
          width: '80%',
        }}>
          <form onSubmit={handleSubmit}>
            <div className={'form-text-field'}>
              <p className={'field-name'}>Ingresá tu nombre de usuario para recuperarla</p>
              <TextField className={'form-field'}
                id="username"
                ref={userRef}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required={true}
              />
            </div>

            <Typography className={errorMessage ? "error-message centered-text" : "hidden"} hidden={!errorMessage} ref={errRef} aria-live="assertive">{errorMessage}</Typography>
            <div className='recovery-button'>
              <Button type="submit" variant="contained">Enviar</Button>
              <p className="success-message" hidden={!requestOngoingMessage} aria-live="assertive">{requestOngoingMessage}</p>
            </div>
          </form>
        </Box> : <>
          <AlertMessage message={"Te enviamos un código a tu e-mail para recuperar tu contraseña"} title={"Enviado"} severity={"success"} />
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
              <Button>Ir al inicio</Button>
            </Link>
          </div>
        </>}
    </div>
  </>
}
