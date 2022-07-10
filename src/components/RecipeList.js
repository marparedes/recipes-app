import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { RecipeCard } from './RecipeCard'


export const RecipeList = ({ recipes }) => {
  return (
    <Box sx={{ flexGrow: 1, margin: "20px" }} >
      <Grid container spacing={2} justifyContent="center">
        {recipes.map(item =>
          <RecipeCard
            id={item._id}
            key={item.id}
            title={item.title}
            image={item.images.length > 0 ? item.images[0].url : ""} // TODO: sacar
            category={item.category}
            score={item.averageScore}
            difficulty={item.difficulty}
          />)}
      </Grid>
    </Box>
  )
}