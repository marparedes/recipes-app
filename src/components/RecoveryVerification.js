import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

export const RecoveryVerification = () => {
  return (
    <Box className={'box'} sx={{
        height: 300,
        margin: 'auto',
        width: '80%',
      }}>
        {/* <form onSubmit={handleSubmit}>
          <div className={'form-text-field'}>
            <p className={'field-name'}>Ingresa el codigo que llego a tu e-mail</p>
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
        </form> */}
      </Box>
  )
}
