import React, { useRef, useState, useEffect } from 'react'
import { Box } from '@mui/system';
import { Button, Checkbox, FormControlLabel, TextareaAutosize, TextField } from '@mui/material';
import '../styles/index.css';
import MenuItem from '@mui/material/MenuItem';
import categories from '../mock/categories';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../components/UserContext';
import urlWebServices from '../webServices';

const difficulties = [1, 2, 3, 4, 5];

function EditRecipe() {
  let { id } = useParams();
  const history = useNavigate();
  const { user } = useUserContext();
  const [recipe, setRecipe] = useState({
    title: "",
    difficulty: difficulties[0],
    category: categories[0],
    ingredients: "",
    procedure: "",
    images: [],
    published: false
  });
  const [errors, setErrors] = useState({});
  const errRef = useRef();
  const successRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [serverImagesCount, setServerImagesCount] = useState(0);

  const handleValidation = () => {
    let allErrors = {};

    // Name
    if (!recipe["title"]) {
      allErrors["title"] = "La receta debe tener un nombre";
    }

    // Difficulty
    if (!recipe["difficulty"]) {
      allErrors["difficulty"] = "La receta debe tener una dificultad";
    }

    // Category
    if (!recipe["category"]) {
      allErrors["category"] = "La receta debe tener una categoría";
    }

    // Ingredients
    if (!recipe["ingredients"]) {
      allErrors["ingredients"] = "La receta debe tener ingredientes";
    }

    // Procedure
    if (!recipe["procedure"]) {
      allErrors["procedure"] = "La receta debe tener un procedimiento detallado";
    }

    return allErrors;
  }

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
      history('/');
    }
  }, []);

  const fetchRecipe = async () => {
    let url = urlWebServices.getRecipe.replace('{id}', id);
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'x-access-token': user.token,
        'Origin': 'http://localhost:3000',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
    const parsedResponse = await response.json();
    setServerImagesCount(parsedResponse.data.images.length);
    parsedResponse.data.images = [];
    await setRecipe(parsedResponse.data);
  }

  const updateRecipe = async () => {
    let url = urlWebServices.putRecipe.replace('{id}', id);
    const formData = new FormData();
    formData.append('title', recipe.title);
    formData.append('difficulty', recipe.difficulty);
    formData.append('category', recipe.category);
    formData.append('ingredients', recipe.ingredients);
    formData.append('procedure', recipe.procedure);
    for (let i = 0; i < recipe.images.length; i++)
    {
      formData.append('images', recipe.images[i])
    }
    formData.append('published', recipe.published);
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Accept': 'application/form-data',
        'x-access-token': user.token,
        'Origin': 'http://localhost:3000',
        // 'Content-Type': 'multipart/form-data'
      },
      body: formData,
    }).catch((err) => console.log("Problema", err));
    const parsedResponse = await response.json();
    if (response.status === 200) {
      setServerImagesCount(parsedResponse.data.images.length);
      parsedResponse.data.images = [];
      await setRecipe(parsedResponse.data);
      return;
    }
    throw new Error(`No se pudo actualizar la receta: ${response.message}`);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    await setErrorMessage('');
    await setSuccessMessage('');
    const validationErrors = handleValidation();
    await setErrors(validationErrors);
    if (Object.keys(validationErrors).length) {
      setErrorMessage('Hay campos con errores!');
      return;
    }
    try {
      await updateRecipe();
      setSuccessMessage('¡Los cambios fueron guardados!');
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = async data => {
    console.log("Data:", data)
    const { name, value } = data;
    await setRecipe({
      ...recipe,
      [name]: value,
    })
  }

  const fileSelectedHandler = async (e) => {
    let images = recipe["images"];
    images.push(e.target.files[0])
    await setRecipe({ ...recipe, images });
  }

  return (
    <div className={'create-recipe'}>
      <h2 className={'page-title'}>Editar receta</h2>

      <Box className={'box'} sx={{
        height: 300,
        margin: 'auto',
        width: '80%',
      }}>
        <form onSubmit={submitForm} encType="multipart/form-data">
          <div className={'form-select-field recipe-name-field'}>
            <p className={'field-name'}>Nombre</p>
            <TextField className={'form-field'}
                       id="recipe-name"
                       onChange={(e) => { handleChange({ name: 'title', value: e.target.value}); }}
                       value={recipe["title"]}
            />
          </div>
          <span style={{ color: "red" }}>{errors["title"]}</span>

          <div className={'form-select-field recipe-difficulty-field'}>
            <p className={'field-name'}>Dificultad</p>
            <TextField className={'form-field'}
                       id="recipe-difficulty"
                       select
                       label="Dificultad"
                       onChange={(e) => { handleChange({ name: 'difficulty', value: e.target.value}); }}
                       value={recipe["difficulty"]}
            >
              {difficulties.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <span style={{ color: "red" }}>{errors["difficulty"]}</span>

          <div className={'form-select-field'}>
            <p className={'field-name'}>Categoría</p>
            <TextField className={'form-field'}
                       id="recipe-category"
                       select
                       label="Categoría"
                       onChange={(e) => { handleChange({ name: 'category', value: e.target.value}); }}
                       value={recipe["category"]}
            >
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <span style={{ color: "red" }}>{errors["categories"]}</span>

          <div className={'form-text-area'}>
            <p className={'field-name'}>Ingredientes</p>
            <TextareaAutosize className={'form-field'}
                              minRows={3}
                              placeholder="Todos los ingredientes"
                              onChange={(e) => { handleChange({ name: 'ingredients', value: e.target.value}); }}
                              value={recipe["ingredients"]}
            />
          </div>
          <span style={{ color: "red" }}>{errors["ingredients"]}</span>

          <div className={'form-text-area'}>
            <p className={'field-name'}>Procedimiento</p>
            <TextareaAutosize className={'form-field'}
                              minRows={3}
                              placeholder="Procedimiento de la receta"
                              onChange={(e) => { handleChange({ name: 'procedure', value: e.target.value}); }}
                              value={recipe["procedure"]}
            />
          </div>
          <span style={{ color: "red" }}>{errors["procedure"]}</span>

          <div>
            <p className={'field-name'}>Imágenes de la comida</p>

            <Button variant="contained" component="label" color="primary">
              {" "}
              Cargar una nueva imagen
              <input type="file" name="upload" hidden multiple onChange={fileSelectedHandler} />
            </Button>
            <p>{recipe["images"] ? recipe["images"].length : 0} nuevas imágenes cargadas (además de las {serverImagesCount} imágenes anteriores)</p>
          </div>
          <span style={{ color: "red" }}>{errors["images"]}</span>

          <div><FormControlLabel
            id="published"
            control={<Checkbox />}
            label="Publicar al guardar"
            onChange={e => handleChange({ name: 'published', value: !recipe["published"]})}
            checked={recipe["published"]}
            value={recipe["published"]}
          /></div>

          <p className="error-message" hidden={!errorMessage} ref={errRef} aria-live="assertive">{errorMessage}</p>
          <p className="success-message" hidden={!successMessage} ref={successRef} aria-live="assertive">{successMessage}</p>
          <Button type="submit" variant="contained" className={'save-button'}>Guardar cambios</Button>
        </form>
      </Box>
    </div>
  );
}

export default EditRecipe;
