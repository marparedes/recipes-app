import Button from '@mui/material/Button'
import React from 'react'
import { useUserContext } from '../components/UserContext'

function Login() {

  const { login } = useUserContext()

  // reemplazar con logica de login, y redirigir a '/'
  // aplicar context para guardar el estado y usarlo en otros componentes

  return (
    <div>
        LOGIN
        <Button variant="text" onClick={() => login({id: "userId", name: "name"})}> Iniciar Sesion</Button>
    </div>
    
  )
}

export default Login