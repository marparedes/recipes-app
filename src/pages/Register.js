import Button from '@mui/material/Button'
import React, { useRef, useState } from 'react'
import { useUserContext } from '../components/UserContext'
import { TextField } from '@mui/material';
import '../styles/index.css';
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import urlWebServices from '../webServices';

function Register() {
  const { login } = useUserContext();
  const history = useNavigate();
  const errRef = useRef();
  const userRef = useRef();
  const [user, setUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});
  const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;

  const handleValidation = () => {
    let allErrors = {};

    // Username
    if (!user.username) {
      allErrors.username = 'Se requiere un nombre de usuario';
    }

    // Password
    if (!user.password) {
      allErrors.password = 'Se requiere una contraseña';
    }

    // First name
    if (!user.firstName) {
      allErrors.firstName = 'Se requiere un nombre';
    }

    // Last name
    if (!user.lastName) {
      allErrors.lastName = 'Se requiere un apellido';
    }

    // Phone
    if (!phoneRegex.test(user.phoneNumber)) {
      allErrors.phoneNumber = 'Se requiere un número de teléfono válido';
    }

    // Email
    if (!user.email) {
      allErrors.email = 'Se requiere un email';
    }
    else if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)) {
      allErrors.email = 'El email ingresado es inválido';
    }

    return allErrors;
  }

  const handleChange = async (data) => {
    const { name, value } = data;
    await setUser({
      ...user,
      [name]: value,
    })
  }

  const submitForm = async (e) => {
    e.preventDefault();
    await setErrorMessage('');
    const validationErrors = handleValidation();
    await setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage('¡Hay campos con errores!');
      return;
    }
    try {
      const parsedResponse = await createUser();
      setErrorMessage('');
      login({ id: parsedResponse.user._id, token: parsedResponse.token, username: parsedResponse.user.username });
      history('/');
    } catch (error) {}
  }

  const createUser = async () => {
    const formData = new URLSearchParams();
    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('phoneNumber', user.phoneNumber);
    formData.append('email', user.email);
    const response = await fetch(urlWebServices.postUser, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/form-data',
        'Origin': 'http://localhost:3000',
      },
      body: formData,
    }).catch((err) => console.log(err));
    const parsedResponse = await response.json();
    if (response.status === 201) {
      return parsedResponse;
    }
    setErrorMessage(parsedResponse.message);
    throw new Error(`No se pudo crear el usuario: ${parsedResponse.message}`);
  }

  return (
    <div className={'register-form'}>
      <h2 className={'page-title'}>Crear nuevo usuario</h2>

      <Box sx={{ margin: 'auto', width: '80%' }}>
        <form onSubmit={submitForm}>
          <div className={'form-text-field'}>
            <p className={'field-name'}>Email</p>
            <TextField className={'form-field'}
              id="email"
              onChange={(e) => { handleChange({ name: 'email', value: e.target.value }); }}
              value={user.email}
            />
          </div>
          <p className={errors.email ? "error-message centered-text" : "hidden"}>{errors.email}</p>

          <div className={'form-text-field'}>
            <p className={'field-name'}>Nombre de usuario</p>
            <TextField className={'form-field'}
              id="username"
              ref={userRef}
              onChange={(e) => { handleChange({ name: 'username', value: e.target.value }); }}
              value={user.username}
            />
          </div>
          <p className={errors.username ? "error-message centered-text" : "hidden"}>{errors.username}</p>

          <div className={'form-text-field'}>
            <p className={'field-name'}>Contraseña</p>
            <TextField className={'form-field'}
              id="password"
              type="password"
              onChange={(e) => { handleChange({ name: 'password', value: e.target.value }); }}
              value={user.password}
            />
          </div>
          <p className={errors.password ? "error-message centered-text" : "hidden"}>{errors.password}</p>

          <div className={'form-text-field'}>
            <p className={'field-name'}>Nombre</p>
            <TextField className={'form-field'}
              id="first-name"
              onChange={(e) => { handleChange({ name: 'firstName', value: e.target.value }); }}
              value={user.firstName}
            />
          </div>
          <p className={errors.firstName ? "error-message centered-text" : "hidden"}>{errors.firstName}</p>

          <div className={'form-text-field'}>
            <p className={'field-name'}>Apellido</p>
            <TextField className={'form-field'}
              id="last-name"
              onChange={(e) => { handleChange({ name: 'lastName', value: e.target.value }); }}
              value={user.lastName}
            />
          </div>
          <p className={errors.lastName ? "error-message centered-text" : "hidden"}>{errors.lastName}</p>

          <div className={'form-text-field'}>
            <p className={'field-name'}>Número de teléfono</p>
            <TextField className={'form-field'}
              id="phone-number"
              onChange={(e) => { handleChange({ name: 'phoneNumber', value: e.target.value }); }}
              value={user.phoneNumber}
            />
          </div>
          <p className={errors.phoneNumber ? "error-message centered-text" : "hidden"}>{errors.phoneNumber}</p>
          <br></br>
          <p className={errorMessage ? "error-message centered-text" : "hidden"} ref={errRef} aria-live="assertive">{errorMessage}</p>
          <div className='form-button'>
            <Button type="submit" variant="contained" className={'save-button'}>Crear usuario</Button>
          </div>
        </form>
      </Box>
    </div>
  )
}

export default Register