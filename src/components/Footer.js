import { Box, Button, Container, Grid, TextField } from '@mui/material'
import React from 'react'

export const Footer = () => {
  return (
    <footer>
      <Box
        bgcolor="primary.main"
        color="#EEEDD6"
      >
        <Container maxWidth="lg" sx={{ padding: "60px"}}>
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
                InputProps={{ endAdornment: <Button variant='contained' color='secondary'>Registrar</Button> }} />
            </Grid>
          </Grid>
          <Box textAlign="center" sx={{ paddingTop:"40px"}}>
            Recetas del Mundo &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  )
}
