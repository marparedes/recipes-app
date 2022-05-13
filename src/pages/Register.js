import Button from '@mui/material/Button'
import React, { useRef, useState } from 'react'
import { useUserContext } from '../components/UserContext'
import { TextField } from '@mui/material';
import '../styles/index.css';
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import useForm from './useForm';

function Register() {
  const { login } = useUserContext()
  const history = useNavigate();

  const errRef = useRef();
  const userRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');

  const handleValidation = (values) => {
    let allErrors = {};

    // Username
    if (!values.username) {
      allErrors.username = 'Se requiere un nombre de usuario';
    }
    else if (values.username === 'hsimpson') {
      allErrors.username = 'Este nombre de usuario ya está en uso';
    }

    // Password
    if (!values.password) {
      allErrors.password = 'Se requiere una contraseña';
    }

    // First name
    if (!values.first_name) {
      allErrors.first_name = 'Se requiere un nombre';
    }

    // Last name
    if (!values.last_name) {
      allErrors.last_name = 'Se requiere un apellido';
    }

    // Last name
    if (!values.phone_number) {
      allErrors.phone_number = 'Se requiere un número de teléfono';
    }

    // Email
    if (!values.email) {
      allErrors.email = 'Se requiere un email';
    }
    else if (values.email === 'hsimpson@gmail.com') {
      allErrors.email = 'Este email ya está en uso';
    }
    else if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      allErrors.email = 'El email ingresado es inválido';
    }

    return allErrors;
  }
  const { handleChange, values, handleSubmit, errors } = useForm(
    {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      email: ''
    },
    handleValidation
  );

  const submitForm = async (e) => {
    e.preventDefault();
    const errors = handleSubmit(e);
    if (errors) {
      setErrorMessage('Hay campos con errores!');
      return;
    }
    const id = "userId";
    setErrorMessage('');
    login({ id, user: values.username })
    history('/');
  }

  return (
    <div className={'register-form'}>
      <h2 className={'page-title'}>Crear nuevo usuario</h2>

      <Box className={'box'} sx={{
        height: 300,
        margin: 'auto',
        width: '80%',
      }}>
        <form onSubmit={submitForm}>
          <div className={'form-text-field'}>
            <p className={'field-name'}>Nombre de usuario</p>
            <TextField className={'form-field'}
              id="username"
              ref={userRef}
              onChange={(e) => { handleChange({ name: 'username', value: e.target.value }); }}
              value={values.username}
            />
          </div>
          <span style={{ color: "red" }}>{errors.username}</span>

          <div className={'form-text-field'}>
            <p className={'field-name'}>Contraseña</p>
            <TextField className={'form-field'}
              id="password"
              type="password"
              onChange={(e) => { handleChange({ name: 'password', value: e.target.value }); }}
              value={values.password}
            />
          </div>
          <span style={{ color: "red" }}>{errors["password"]}</span>

          <div className={'form-text-field'}>
            <p className={'field-name'}>Nombre</p>
            <TextField className={'form-field'}
              id="first-name"
              onChange={(e) => { handleChange({ name: 'first_name', value: e.target.value }); }}
              value={values.first_name}
            />
          </div>
          <span style={{ color: "red" }}>{errors["first_name"]}</span>

          <div className={'form-text-field'}>
            <p className={'field-name'}>Apellido</p>
            <TextField className={'form-field'}
              id="last-name"
              onChange={(e) => { handleChange({ name: 'last_name', value: e.target.value }); }}
              value={values.last_name}
            />
          </div>
          <span style={{ color: "red" }}>{errors["last_name"]}</span>

          <div className={'form-text-field'}>
            <p className={'field-name'}>Número de teléfono</p>
            <TextField className={'form-field'}
              id="phone-number"
              onChange={(e) => { handleChange({ name: 'phone_number', value: e.target.value }); }}
              value={values.phone_number}
            />
          </div>
          <span style={{ color: "red" }}>{errors["phone_number"]}</span>

          <div className={'form-text-field'}>
            <p className={'field-name'}>Email</p>
            <TextField className={'form-field'}
              id="email"
              onChange={(e) => { handleChange({ name: 'email', value: e.target.value }); }}
              value={values.email}
            />
          </div>
          <span style={{ color: "red" }}>{errors["email"]}</span>
          <br></br>
          <p className="error-message" hidden={!errorMessage} ref={errRef} aria-live="assertive">{errorMessage}</p>
          <div className='form-button'>
            <Button type="submit" variant="contained" className={'save-button'}>Crear usuario</Button>
          </div>
        </form>
      </Box>
    </div>
  )
}

export default Register