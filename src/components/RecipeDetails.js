import { Box } from '@mui/system';
import React, { useRef, useState } from 'react';
import '../styles/index.css';
import ImageSlider from './ImageSlider';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Button, TextField } from '@mui/material';
import { useUserContext } from './UserContext';

export const RecipeDetails = ({ recipe }) => {

  const { user } = useUserContext();

  const [showScoreButton, setShowScoreButton] = useState(true)
  const [newScore, setNewScore] = useState(0)

  const [score, setScore] = useState(recipe.score)

  const updateScore = () => {
    var num = (parseFloat(parseFloat(score) + parseFloat(newScore))/2).toFixed(1)
    setScore(num)
    setShowScoreButton(!showScoreButton)
  }


  return (
    <Box sx={{ flexGrow: 1, margin: 10 }} >
      <h2 className="page-title">{recipe.title}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
        <div className="half-container">
          <div className="recipe-details-half">
            <p className="one-line-recipe-field"><strong>Autor:</strong> {recipe.author}</p>
            <ImageSlider imageUrls={recipe.images}></ImageSlider>
            <p className="one-line-recipe-field"><strong>Categoría:</strong> {recipe.category}</p>
            <p className="one-line-recipe-field"><strong>Calificación:</strong> {score} / 5</p>

            {showScoreButton ? <Button variant='outlined' disabled={!user} onClick={() => setShowScoreButton(!showScoreButton)}>Calificar receta</Button> :
            <div className='form-button'>
              <TextField
                id="newScore"
                onChange={(e) => setNewScore(e.target.value)}
                value={newScore}
                required={true}
                type="number"
                sx={{width:"100px"}}
              />
              <Button variant='outlined' onClick={updateScore} sx={{margin:"10px"}}>Calificar</Button>
            </div>
          }
          </div>
        </div>
        <div className="half-container">
          <div className="recipe-details-half">
            <div style={{ display: "inline-block" }}>
              <section>
                <h2><RestaurantMenuOutlinedIcon /> Ingredientes</h2>
                <p>{recipe.ingredients}</p>
              </section>
              <section>
                <h2 className="recipe-details-title"><AccessTimeFilledIcon /> Procedimiento</h2>
                {recipe.procedure.split('\n').map(e => <p>{e}</p>)}
              </section>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}