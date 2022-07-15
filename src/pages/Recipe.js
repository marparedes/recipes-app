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
  const { user } = useUserContext();

  const [recipe, setRecipe] = useState({});
  const [showScoreButton, setShowScoreButton] = useState(false);
  const [showScoreForm, setShowScoreForm] = useState(false);
  const [averageScore, setAverageScore] = useState(null);
  const [newScore, setNewScore] = useState(null);
  const [scoreMessage, setScoreMessage] = useState('');

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
    let headers = {
      'Accept': 'application/x-www-form-urlencoded',
      'Origin': 'http://localhost:3000',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    if (!!user) { headers['x-access-token'] = user.token };
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: headers
    });
    const parsedResponse = await response.json();
    await setRecipe(parsedResponse.data);
    await setAverageScore(parsedResponse.data.averageScore);
    await setShowScoreButton(parsedResponse.data.canSendScoreForRecipe);
  }

  const triggerShowScoreButton = async () => {
    await setShowScoreButton(false);
    await setShowScoreForm(true);
  }

  const updateScore = async () => {
    await setScoreMessage('Enviando calificación...');
    let url = urlWebServices.postScore.replace('{id}', recipe._id);
    const formData = new URLSearchParams();
    formData.append('score', parseInt(newScore));
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'x-access-token': user.token,
        'Origin': 'http://localhost:3000',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData,
    }).catch((err) => console.log(err));
    const parsedResponse = await response.json();
    if (response.status === 201) {
      await setAverageScore(parsedResponse.data.averageScore);
      await setShowScoreForm(false);
      setScoreMessage('¡La calificación fue enviada!');
      return;
    }
    throw new Error(`No se pudo calificar la receta: ${parsedResponse.message}`);
  }

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
              <p className="one-line-recipe-field"><strong>Dificultad:</strong> {recipe.difficulty}</p>
              <p className="one-line-recipe-field"><strong>Calificación:</strong> {averageScore} / 5</p>

              {
                showScoreButton ?
                  <Button variant='outlined' disabled={!user} onClick={triggerShowScoreButton}>Calificar
                    receta</Button> :
                  null
              }
              {
                showScoreForm ?
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
                  </div> :
                  null
              }
              <p className="success-message" hidden={!scoreMessage} aria-live="assertive">{scoreMessage}</p>
            </div>
          </div>
          <div className="half-container">
            <div className="recipe-details-half">
              <div style={{ display: "inline-block" }}>
                <section>
                  <h2><RestaurantMenuOutlinedIcon/> Ingredientes</h2>
                  {!!recipe.ingredients ? recipe.ingredients.split('\n').map(e => <p>{e}</p>) : ""}
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
}

export default Recipe;
