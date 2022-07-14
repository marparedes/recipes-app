import React, { useRef, useState } from 'react'
import { Box } from '@mui/system';
import { Button, Checkbox, FormControlLabel, TextareaAutosize, TextField } from '@mui/material';
import '../styles/index.css';
import MenuItem from '@mui/material/MenuItem';
import categories from '../mock/categories';
import { useUserContext } from '../components/UserContext';
import urlWebServices from '../webServices';


const difficulties = [1, 2, 3, 4, 5];

function CreateRecipe() {
  const { user } = useUserContext();
  const [errors, setErrors] = useState({});
  const errRef = useRef();
  const successRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const getInitializedRecipeData = () => {
    return {
      title: "",
      difficulty: difficulties[0],
      category: categories[0],
      ingredients: "",
      procedure: "",
      images: [],
      published: false
    };
  }
  const [recipe, setRecipe] = useState(getInitializedRecipeData());

  const handleValidation = () => {
    let errors = {};

    // Title
    if (!recipe["title"]) {
      errors["title"] = "La receta debe tener un nombre";
    }

    // Difficulty
    if (!recipe["difficulty"]) {
      errors["difficulty"] = "La receta debe tener una dificultad";
    }

    // Category
    if (!recipe["category"]) {
      errors["category"] = "La receta debe tener una categoría";
    }

    // Ingredients
    if (!recipe["ingredients"]) {
      errors["ingredients"] = "La receta debe tener ingredientes";
    }

    // Procedure
    if (!recipe["procedure"]) {
      errors["procedure"] = "La receta debe tener un procedimiento detallado";
    }

    // Images
    if (!recipe["images"].length) {
      errors["images"] = "La receta debe tener al menos una foto";
    }

    return errors;
  }

  const contactSubmit = async (e) => {
    e.preventDefault();
    await setErrorMessage('');
    await setSuccessMessage('');
    const validationErrors = handleValidation();
    await setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage('¡Hay campos con errores!');
      return;
    }
    try {
      await createRecipe();
      setSuccessMessage('¡Los cambios fueron guardados!');
    } catch (error) {
      console.log(error);
      setErrorMessage('Hubo un problema creando la receta');
    }
  }

  const createRecipe = async () => {
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
    const response = await fetch(urlWebServices.postRecipe, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/form-data',
        'x-access-token': user.token,
        'Origin': 'http://localhost:3000',
      },
      body: formData,
    }).catch((err) => console.log(err));
    if (response.status === 201) {
      await setRecipe(getInitializedRecipeData());
      return;
    }
    throw new Error(`No se pudo crear la receta: ${response.message}`);
  }

  const handleChange = async (data) => {
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
      <p>{user._id}</p>
      <h2 className={'page-title'}>Crear una receta</h2>

      <Box className={'box'} sx={{
        height: 300,
        margin: 'auto',
        width: '80%',
      }}>
        <form onSubmit={contactSubmit} encType="multipart/form-data">
          <div className={'form-select-field recipe-name-field'}>
            <p className={'field-name'}>Nombre</p>
            <TextField className={'form-field'}
                       id="recipe-title"
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
          <span style={{ color: "red" }}>{errors["category"]}</span>

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
              Cargar una imagen
              <input type="file" name="upload" hidden multiple onChange={fileSelectedHandler} />
            </Button>
            <p>{recipe["images"] ? recipe["images"].length : 0} imágenes cargadas</p>
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
          <Button type="submit" variant="contained" className={'save-button'}>Guardar</Button>
        </form>
      </Box>
    </div>
  );
}

export default CreateRecipe;
