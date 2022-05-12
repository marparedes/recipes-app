import Button from '@mui/material/Button'
import React, { useRef, useState } from 'react'
import { useUserContext } from '../components/UserContext'
import { TextField } from '@mui/material';
import '../styles/index.css';
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import useForm from './useForm';
import usersMock from '../mock/users';

function Profile() {
  const { login } = useUserContext()
  const history = useNavigate();
  const userData = usersMock[0];

  const errRef = useRef();
  const successRef = useRef();
  const successPasswordRef = useRef();
  const userRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [successPasswordMessage, setSuccessPasswordMessage] = useState('');

  const handlePasswordValidation = (values) => {
    let allErrors = {};
    // Password
    if (!passwordValues.password) {
      allErrors.password = 'Se requiere una contraseña';
    }
    return allErrors;
  }

  const handleValidation = (values) => {
    let allErrors = {};

    // Username
    if (!values.username) {
      allErrors.username = 'Se requiere un nombre de usuario';
    }
    else if (values.username === 'hsimpson') {
      allErrors.username = 'Este nombre de usuario ya está en uso';
    }

    // First name
    if (!values.first_name) {
      allErrors.first_name = 'Se requiere un nombre';
    }

    // Last name
    if (!values.last_name) {
      allErrors.last_name = 'Se requiere un apellido';
    }

    return allErrors;
  }
  const { handleChange, values, handleSubmit, errors } = useForm(
    {
      username: userData.username,
      first_name: userData.first_name,
      last_name: userData.last_name
    },
    handleValidation
  );
  const { handleChange: handlePasswordChange, values: passwordValues, handleSubmit: handlePasswordSubmit, errors: passwordErrors } = useForm(
    {
      password: ''
    },
    handlePasswordValidation
  );

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const errors = handleSubmit(e);
    if (Object.keys(errors).length) {
      setErrorMessage('Hay campos con errores!');
      return;
    }
    setSuccessMessage('¡Los cambios fueron guardados!');
    login({ id: 'userId', user: values.username });
    handleChange({ name: 'password', value: ''})
  }

  const submitPasswordForm = async (e) => {
    setSuccessPasswordMessage('');
    e.preventDefault();
    const errors = handlePasswordSubmit(e);
    console.log(errors);
    if (Object.keys(errors).length) {
      return;
    }
    setSuccessPasswordMessage('¡La contraseña fue cambiada!');
    handlePasswordChange({ name: 'password', value: ''})
  }

  return (
    <div className={'login-form'}>
      <h2 className={'page-title'}>Actualizar perfil</h2>

      <div className={'profile-section'}>
        <Box className={'box'} sx={{
          margin: 'auto',
          width: '80%',
        }}>
          <h2>Cambiar datos personales</h2>
          <form style={{height: '100%'}} onSubmit={submitForm}>
            <div className={'form-text-field'}>
              <p className={'field-name'}>Nombre de usuario</p>
              <TextField className={'form-field'}
                         id="username"
                         ref={userRef}
                         onChange={(e) => { handleChange({ name: 'username', value: e.target.value}); }}
                         value={values.username}
              />
            </div>
            <span style={{ color: "red" }}>{errors.username}</span>

            <div className={'form-text-field'}>
              <p className={'field-name'}>Nombre</p>
              <TextField className={'form-field'}
                         id="first-name"
                         onChange={(e) => { handleChange({ name: 'first_name', value: e.target.value}); }}
                         value={values.first_name}
              />
            </div>
            <span style={{ color: "red" }}>{errors["first_name"]}</span>

            <div className={'form-text-field'}>
              <p className={'field-name'}>Apellido</p>
              <TextField className={'form-field'}
                         id="last-name"
                         onChange={(e) => { handleChange({ name: 'last_name', value: e.target.value}); }}
                         value={values.last_name}
              />
            </div>
            <span style={{ color: "red" }}>{errors["last_name"]}</span>
            <br></br>
            <p className="error-message" hidden={!errorMessage} ref={errRef} aria-live="assertive">{errorMessage}</p>
            <p className="success-message" hidden={!successMessage} ref={successRef} aria-live="assertive">{successMessage}</p>
            <Button type="submit" variant="contained" className={'save-button'}>Guardar cambios</Button>
          </form>
        </Box>
      </div>
      <br></br>
      <div className={'separator'}></div>
      <div className={'profile-section'}>
        <Box className={'box'} sx={{
          height: 300,
          margin: 'auto',
          width: '80%',
        }}>
          <h2>Cambiar contraseña</h2>
          <form onSubmit={submitPasswordForm}>
            <div className={'form-text-field'}>
              <p className={'field-name'}>Contraseña</p>
              <TextField className={'form-field'}
                         id="password"
                         type="password"
                         onChange={(e) => { handlePasswordChange({ name: 'password', value: e.target.value}); }}
                         value={passwordValues.password}
              />
            </div>
            <span style={{ color: "red" }}>{passwordErrors["password"]}</span>
            <br></br>
            <p className="success-message" hidden={!successPasswordMessage} ref={successPasswordRef} aria-live="assertive">{successPasswordMessage}</p>
            <Button type="submit" variant="contained" className={'save-button'}>Guardar cambios</Button>
          </form>
        </Box>
      </div>
    </div>
  )
}

export default Profile