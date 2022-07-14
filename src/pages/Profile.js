import Button from '@mui/material/Button';
import React, { useRef, useState, useEffect } from 'react';
import { useUserContext } from '../components/UserContext';
import { TextField } from '@mui/material';
import '../styles/index.css';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import urlWebServices from '../webServices';

function Profile() {
  const [userData, setUserData] = useState({
    "firstName": "",
    "lastName": ""
  });
  const [password, setPassword] = useState('');

  const errRef = useRef();
  const successRef = useRef();
  const successPasswordRef = useRef();
  const userRef = useRef();
  const history = useNavigate();
  const { user } = useUserContext();

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [successPasswordMessage, setSuccessPasswordMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  useEffect(() => {
    const getUser = async () => {
      await fetchUser();
    }
    try {
      getUser().then().catch((error) => {
        console.log("Could not fetch user...", error)
      });
    } catch (error) {
      console.log(error.message);
      history('/');
    }
  }, []);

  const fetchUser = async () => {
    const response = await fetch(urlWebServices.getUser, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'x-access-token': user.token,
        'Origin': 'http://localhost:3000',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
    const parsedResponse = await response.json();
    await setUserData(parsedResponse);
  }

  const handleChange = async data => {
    const { name, value } = data;
    await setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleValidation = () => {
    let allErrors = {};

    // First name
    if (!userData.firstName) {
      allErrors.firstName = 'Se requiere un nombre';
    }

    // Last name
    if (!userData.lastName) {
      allErrors.lastName = 'Se requiere un apellido';
    }

    return allErrors;
  }

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const validationErrors = handleValidation();
    if (Object.keys(validationErrors).length) {
      setErrorMessage('¡Hay campos con errores!');
      return;
    }
    try {
      await updateUser();
      setSuccessMessage('¡Los cambios fueron guardados!');
    } catch (error) {
      console.log(error);
    }
  }

  const updateUser = async () => {
    const formData = new URLSearchParams();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    const response = await fetch(urlWebServices.putUser, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Accept': 'application/form-data',
        'x-access-token': user.token,
        'Origin': 'http://localhost:3000',
      },
      body: formData,
    }).catch((err) => console.log(err));
    const parsedResponse = await response.json();
    if (response.status === 200) {
      return;
    }
    setErrorMessage(parsedResponse.message);
    throw new Error(`No se pudo actualizar al usuario: ${parsedResponse.message}`);
  }

  const submitPasswordForm = async (e) => {
    setSuccessPasswordMessage('');
    e.preventDefault();
    if (!password) {
      await setPasswordErrorMessage('Se requiere una contraseña');
      return;
    }
    try {
      await updateUserPassword();
      setPasswordErrorMessage('');
      setSuccessPasswordMessage('¡La contraseña fue cambiada!');
    } catch (error) {
      console.log(error);
      setPasswordErrorMessage(error.message);
    }
  }

  const updateUserPassword = async () => {
    const formData = new URLSearchParams();
    formData.append('password', password);
    const response = await fetch(urlWebServices.putNewPassword, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Accept': 'application/form-data',
        'x-access-token': user.token,
        'Origin': 'http://localhost:3000',
      },
      body: formData,
    }).catch((err) => console.log(err));
    if (response.status === 204) {
      return;
    }
    setErrorMessage(response.message);
    throw new Error(`No se pudo actualizar al usuario: ${response.message}`);
  }

  return (
    <div className={'profile-page'}>
      <h2 className={'page-title'}>Actualizar perfil</h2>

      <div className={'profile-form-section'}>
        <Box className={'box'} sx={{
          margin: 'auto',
          width: '80%',
        }}>
          <h2 className="centered-text">Cambiar datos personales</h2>
          <form style={{ height: '100%' }} onSubmit={submitForm}>
            <div className={'form-text-field'}>
              <p className={'field-name'}>Nombre</p>
              <TextField className={'form-field'}
                id="first-name"
                onChange={(e) => { handleChange({ name: 'firstName', value: e.target.value }); }}
                value={userData.firstName}
              />
            </div>
            <p className={errors.firstName ? "error-message centered-text" : "hidden"}>{errors.firstName}</p>

            <div className={'form-text-field'}>
              <p className={'field-name'}>Apellido</p>
              <TextField className={'form-field'}
                id="last-name"
                onChange={(e) => { handleChange({ name: 'lastName', value: e.target.value }); }}
                value={userData.lastName}
              />
            </div>
            <p className={errors.lastName ? "error-message centered-text" : "hidden"}>{errors.lastName}</p>
            <br></br>
            <p className={errorMessage ? "error-message centered-text" : "hidden"} ref={errRef}>{errorMessage}</p>
            <p className={successMessage ? "success-message centered-text" : "hidden"} ref={successRef} aria-live="assertive">{successMessage}</p>
            <div className='form-button'>
              <Button type="submit" variant="contained" className={'save-button'}>Guardar cambios</Button>
            </div>
          </form>
        </Box>
      </div>
      <br></br>
      <div className={'separator'}></div>
      <div className={'profile-form-section'}>
        <Box className={'box'} sx={{
          height: 300,
          margin: 'auto',
          width: '80%',
        }}>
          <h2 className="centered-text">Cambiar contraseña</h2>
          <form onSubmit={submitPasswordForm}>
            <div className={'form-text-field'}>
              <p className={'field-name'}>Contraseña</p>
              <TextField className={'form-field'}
                id="password"
                type="password"
                onChange={(e) => { setPassword(e.target.value); }}
                value={password}
              />
            </div>
            <p className={!!passwordErrorMessage ? "error-message centered-text" : "hidden"}>{passwordErrorMessage}</p>
            <p className={!!successPasswordMessage ? "success-message centered-text" : "hidden"} ref={successPasswordRef} aria-live="assertive">{successPasswordMessage}</p>
            <br></br>
            <div className='form-button'>
              <Button type="submit" variant="contained" className={'save-button'}>Guardar cambios</Button>
            </div>
          </form>
        </Box>
      </div>
    </div>
  )
}

export default Profile