import React, { useRef, useState, useEffect } from 'react'
import { Box } from '@mui/system';
import { Button, Checkbox, FormControlLabel, TextareaAutosize, TextField } from '@mui/material';
import '../styles/index.css';
import MenuItem from '@mui/material/MenuItem';
import categories from '../mock/categories';
import useForm from './useForm';
import recipesMock from '../mock/recipes';
import { useNavigate, useParams } from 'react-router-dom';

const difficulties = [1, 2, 3, 4, 5];

function EditRecipe() {
  let {id} = useParams();
  const history = useNavigate();
  let recipeIndex = -1;
  try {
    id = parseInt(id);
    for (let i = 0; i < recipesMock.length; i++) {
      if (recipesMock[i].id === id) {
        recipeIndex = i;
        break;
      }
    }
  }
  catch {}
  const recipeData = recipesMock[recipeIndex];
  const errRef = useRef();
  const successRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleValidation = (values) => {
    let allErrors = {};

    // Name
    if (!values["title"]) {
      allErrors["title"] = "La receta debe tener un nombre";
    }

    // Difficulty
    if (!values["difficulty"]) {
      allErrors["difficulty"] = "La receta debe tener una dificultad";
    }

    // Category
    if (!values["category"]) {
      allErrors["category"] = "La receta debe tener una categoría";
    }

    // Ingredients
    if (!values["ingredients"]) {
      allErrors["ingredients"] = "La receta debe tener ingredientes";
    }

    // Procedure
    if (!values["procedure"]) {
      allErrors["procedure"] = "La receta debe tener un procedimiento detallado";
    }

    // Images
    if (!values["images"].length) {
      allErrors["images"] = "La receta debe tener al menos una foto";
    }

    return allErrors;
  }
  const { handleChange, values, handleSubmit, errors } = useForm(
    {
      title: recipeData.title,
      difficulty: recipeData.difficulty,
      category: recipeData.category,
      ingredients: recipeData.ingredients,
      procedure: recipeData.procedure,
      images: recipeData.images,
      publish: recipeData.publish
    },
    handleValidation
  );

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const errors = handleSubmit(e);
    if (Object.keys(errors).length) {
      setErrorMessage('Hay campos con errores!');
      return;
    }
    setSuccessMessage('¡Los cambios fueron guardados!');
  }

  const fileSelectedHandler = (e) => {
    let images = values["images"];
    images.push(e.target.files[0])
    handleChange({ name: 'images', value: images});
  }

  useEffect(() => {
    if (recipeIndex === -1) {
      history('/');
    }
  }, [])



  return (
    <div className={'create-recipe'}>
      <h2 className={'page-title'}>Editar receta</h2>

      <Box className={'box'} sx={{
        height: 300,
        margin: 'auto',
        width: '80%',
      }}>
        <form onSubmit={submitForm}>
          <div className={'form-select-field recipe-name-field'}>
            <p className={'field-name'}>Nombre</p>
            <TextField className={'form-field'}
                       id="recipe-name"
                       onChange={(e) => { handleChange({ name: 'title', value: e.target.value}); }}
                       value={values["title"]}
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
                       value={values["difficulty"]}
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
                       value={values["category"]}
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
                              value={values["ingredients"]}
            />
          </div>
          <span style={{ color: "red" }}>{errors["ingredients"]}</span>

          <div className={'form-text-area'}>
            <p className={'field-name'}>Procedimiento</p>
            <TextareaAutosize className={'form-field'}
                              minRows={3}
                              placeholder="Procedimiento de la receta"
                              onChange={(e) => { handleChange({ name: 'procedure', value: e.target.value}); }}
                              value={values["procedure"]}
            />
          </div>
          <span style={{ color: "red" }}>{errors["procedure"]}</span>

          <div>
            <p className={'field-name'}>Imágenes de la comida</p>

            <Button variant="contained" component="label" color="primary">
              {" "}
              Cargar una imagen
              <input type="file" hidden multiple onChange={fileSelectedHandler} />
            </Button>
            <p>{values["images"].length} imágenes cargadas</p>
          </div>
          <span style={{ color: "red" }}>{errors["images"]}</span>

          <div><FormControlLabel
            id="publish"
            control={<Checkbox />}
            label="Publicar al guardar"
            onChange={e => handleChange({ name: 'publish', value: !values["publish"]})}
            checked={values["publish"]}
            value={values["publish"]}
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
