import { Alert, AlertTitle, Grid } from '@mui/material'
import React from 'react'

export const AlertMessage = ({ message, title = "", severity }) => {
    return (
        <Grid container sx={{ margin: "0 auto" }} justifyContent="center" xs={8} sm={8}>
            <Grid item>
                <Alert severity={severity} >
                    <AlertTitle>{title}</AlertTitle>
                    {message}
                </Alert>
            </Grid>
        </Grid>
    )
}
