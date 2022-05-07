import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { RecipeCard } from './RecipeCard'


export const RecipeList = ({recipes}) => {
  
  return (
    <Box sx={{ flexGrow: 1, margin:"20px" }} >
      <Grid container spacing={2} justifyContent="center">
        {recipes.map(item => <RecipeCard id={item.id} title={item.title} image={item.images} prepTime={item.prep_time}/>)}
      </Grid>
    </Box>
  )
}