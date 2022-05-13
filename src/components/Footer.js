import { Box, Button, Container, Grid, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="primary.main"
        color="#EEEDD6"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Seguinos</Box>
              <Box>
                <ul type="none" >
                  <li >
                    Instagram
                  </li>
                  <li>
                    Facebook
                  </li>
                  <li>
                    Twitter
                  </li>
                </ul>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Contacto</Box>
              <Box>
                <ul type="none" >
                  <li >
                    CABA
                  </li>
                  <li>
                    (+54) 1234567890
                  </li>
                  <li>
                    info.contact@gmail.com
                  </li>
                </ul>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>Registra tu e-mail para noticias</Box>
              <TextField
                label="E-mail"
                sx={{ margin: "20px 0" }}
                color="secondary"
                focused
                InputProps={{ endAdornment: <Button variant='contained'  color='secondary'>Registrar</Button> }} />
          </Grid>
        </Grid>
        <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
          Recetas del Mundo &reg; {new Date().getFullYear()}
        </Box>
      </Container>
    </Box>
    </footer >
  )
}
