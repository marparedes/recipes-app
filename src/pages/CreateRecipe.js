import React from 'react'
import { Box } from '@mui/system';
import { Button, Checkbox, FormControlLabel, TextareaAutosize, TextField } from '@mui/material';
import '../styles/index.css';
import MenuItem from '@mui/material/MenuItem';
import categories from '../mock/categories';


const difficulties = [1, 2, 3, 4, 5];

// TODO: redirigir al guardar

function CreateRecipe() {
  const [category, setCategory] = React.useState(null);
  const [difficulty, setDifficulty] = React.useState(null);
  const [images, setImages] = React.useState([]);
  const updateCategory = (event) => {
    setCategory(event.target.value);
  };
  const updateDifficulty = (event) => {
    setDifficulty(event.target.value);
  };
  const fileSelectedHandler = (e) => {
    images.push(e.target.files[0])
    setImages(images);
  }
  return (
    <div className={'create-recipe'}>
      <h2 className={'page-title'}>Create a recipe</h2>

      <Box className={'box'} sx={{
        height: 300,
        margin: 'auto',
        width: '80%',
      }}>
        <form>
          <div className={'form-text-field recipe-name-field'}>
            <p className={'field-name'}>Nombre</p>
            <TextField className={'form-field'}
              id="recipe-name"
              defaultValue="Nombre de la receta"
            />
          </div>

          <div className={'form-select-field recipe-difficulty-field'}>
            <p className={'field-name'}>Dificultad</p>
            <TextField className={'form-field'}
              id="recipe-difficulty"
              select
              label="Dificultad"
              value={difficulty}
              onChange={updateDifficulty}
            >
              {difficulties.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className={'form-select-field'}>
            <p className={'field-name'}>Categoría</p>
            <TextField className={'form-field'}
              id="recipe-category"
              select
              label="Categoría"
              value={category}
              onChange={updateCategory}
            >
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className={'form-text-area'}>
            <p className={'field-name'}>Ingredientes</p>
            <TextareaAutosize className={'form-field'}
              minRows={3}
              placeholder="Todos los ingredientes"
            />
          </div>

          <div className={'form-text-area'}>
            <p className={'field-name'}>Procedimiento</p>
            <TextareaAutosize className={'form-field'}
              minRows={3}
              placeholder="Procedimiento de la receta"
            />
          </div>

          <div>
            <p className={'field-name'}>Imágenes de la comida</p>

            <Button variant="contained" component="label" color="primary">
              {" "}
              Cargar una imagen
              <input type="file" hidden multiple onChange={fileSelectedHandler} />
            </Button>
            <p>{images.length} imágenes cargadas</p>
          </div>

          <div><FormControlLabel control={<Checkbox />} label="Publicar al guardar" /></div>
          <Button variant="contained" className={'save-button'}>Guardar</Button>
        </form>
      </Box>
    </div>
  );
}

export default CreateRecipe;
