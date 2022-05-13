import { Box } from '@mui/system';
import React from 'react';
import '../styles/index.css';
import ImageSlider from './ImageSlider';


export const RecipeDetails = ({recipe}) => {
  return (
    <Box sx={{ flexGrow: 1, margin:"20px" }} >
      <h2 className="page-title">{recipe.title}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
        <div className="half-container">
          <div className="recipe-details-half">
            <p className="one-line-recipe-field"><strong>Autor:</strong> {recipe.author}</p>
            <ImageSlider imageUrls={recipe.images}></ImageSlider>
            <p className="one-line-recipe-field"><strong>Categoría:</strong> {recipe.category}</p>
            <p className="one-line-recipe-field"><strong>Calificación:</strong> {recipe.score} / 5</p>
          </div>
        </div>
        <div className="half-container">
          <div className="recipe-details-half">
            <div style={{ display: "inline-block" }}>
              <section>
                <h2>Ingredientes</h2>
                <p>{recipe.ingredients}</p>
              </section>
              <section>
                <h2 className="recipe-details-title">Procedimiento</h2>
                {recipe.procedure.split('\n').map(e => <p>{ e }</p>)}
              </section>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}