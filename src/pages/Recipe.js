import { useParams } from 'react-router-dom'
import urlWebServices from '../webServices';
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../components/UserContext';
import { Box } from '@mui/system';
import ImageSlider from '../components/ImageSlider';
import { Button, TextField } from '@mui/material';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({})

  /* cosas de RecipeDetails.js */
  const { user } = useUserContext();

  const [showScoreButton, setShowScoreButton] = useState(true)
  const [newScore, setNewScore] = useState(0)

  const [score, setScore] = useState(recipe.score)

  const updateScore = () => {
    var num = (parseFloat(parseFloat(score) + parseFloat(newScore))/2).toFixed(1)
    setScore(num)
    setShowScoreButton(!showScoreButton)
  }
  /* cosas de RecipeDetails.js */




  useEffect(() => {
    const getRecipe = async () => {
      await fetchRecipe();
    }
    try {
      getRecipe().then().catch((error) => {
        console.log("Could not fetch recipe...", error)
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const fetchRecipe = async () => {
    let url = urlWebServices.getRecipe.replace('{id}', id);
    console.log("Using url: ", url)
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        // 'x-access-token': WebToken.webToken,
        'Origin': 'http://localhost:3000',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
    const parsedResponse = await response.json();
    console.log("Got response:", parsedResponse)
    setRecipe(parsedResponse.data);
  }

  // return recipe !== {} ? (
  //   <RecipeDetails recipe={recipe}></RecipeDetails>
  // ) : <p>Loading...</p>

  /* render de RecipeDetails */
  return <>
    { !!recipe ?
      <Box sx={{ flexGrow: 1, margin: 10 }}>
        <h2 className="page-title">{recipe.title}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
          <div className="half-container">
            <div className="recipe-details-half">
              <p className="one-line-recipe-field"><strong>Autor:</strong> {recipe.author}</p>
              {!!recipe._id ? <ImageSlider imageUrls={recipe.images}></ImageSlider> : <></>}
              <p className="one-line-recipe-field"><strong>Categoría:</strong> {recipe.category}</p>
              <p className="one-line-recipe-field"><strong>Calificación:</strong> {score} / 5</p>

              {showScoreButton ?
                <Button variant='outlined' disabled={!user} onClick={() => setShowScoreButton(!showScoreButton)}>Calificar
                  receta</Button> :
                <div className='form-button'>
                  <TextField
                    id="newScore"
                    onChange={(e) => setNewScore(e.target.value)}
                    value={newScore}
                    required={true}
                    type="number"
                    sx={{ width: "100px" }}
                  />
                  <Button variant='outlined' onClick={updateScore} sx={{ margin: "10px" }}>Calificar</Button>
                </div>
              }
            </div>
          </div>
          <div className="half-container">
            <div className="recipe-details-half">
              <div style={{ display: "inline-block" }}>
                <section>
                  <h2><RestaurantMenuOutlinedIcon/> Ingredientes</h2>
                  <p>{recipe.ingredients}</p>
                </section>
                <section>
                  <h2 className="recipe-details-title"><AccessTimeFilledIcon/> Procedimiento</h2>
                  {!!recipe.procedure ? recipe.procedure.split('\n').map(e => <p>{e}</p>) : ""}
                </section>
              </div>
            </div>
          </div>
        </div>
      </Box> : <div>Cargando...</div>
    }
  </>
  /* render de RecipeDetails */
}

export default Recipe;
