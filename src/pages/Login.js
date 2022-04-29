import Button from '@mui/material/Button'
import React from 'react'
import { useUserContext } from '../components/UserContext'

function Login() {

  const { login } = useUserContext()

  return (
    <div>
        LOGIN
        <Button variant="text" onClick={() => login({id: "userId", name: "name"})}> Iniciar Sesion</Button>
    </div>
    
  )
}

export default Login