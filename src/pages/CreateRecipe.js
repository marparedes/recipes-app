import React from 'react'
import { Box } from '@mui/system';
import { Button, Checkbox, FormControlLabel, TextareaAutosize, TextField } from '@mui/material';
import '../styles/index.css';
import MenuItem from '@mui/material/MenuItem';
import categories from '../mock/categories';


const difficulties = [1, 2, 3, 4, 5];

// TODO: redirigir al guardar
class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {'images': [], 'published': false},
      errors: {},
    };
  }


  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    // Name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "La receta debe tener un nombre";
    }

    // Difficulty
    if (!fields["difficulty"]) {
      formIsValid = false;
      errors["difficulty"] = "La receta debe tener una dificultad";
    }

    // Category
    if (!fields["category"]) {
      formIsValid = false;
      errors["category"] = "La receta debe tener una categoría";
    }

    // Ingredients
    if (!fields["ingredients"]) {
      formIsValid = false;
      errors["ingredients"] = "La receta debe tener ingredientes";
    }

    // Procedure
    if (!fields["procedure"]) {
      formIsValid = false;
      errors["procedure"] = "La receta debe tener un procedimiento detallado";
    }

    // Images
    if (!fields["images"].length) {
      formIsValid = false;
      errors["images"] = "La receta debe tener al menos una foto";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      alert("La receta fue creada exitosamente!");
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  updateCheckBox(e){
    let fields = this.state.fields;
    fields["published"] = !fields["published"];
    this.setState({ fields });
    return fields["published"];
  }

  fileSelectedHandler = (e) => {
    let fields = this.state.fields;
    fields["images"].push(e.target.files[0])
    this.setState({ fields });
  }

  render() {
    return (
      <div className={'create-recipe'}>
        <h2 className={'page-title'}>Crear una receta</h2>

        <Box className={'box'} sx={{
          height: 300,
          margin: 'auto',
          width: '80%',
        }}>
          <form onSubmit={this.contactSubmit.bind(this)}>
            <div className={'form-select-field recipe-name-field'}>
              <p className={'field-name'}>Nombre</p>
              <TextField className={'form-field'}
                         id="recipe-name"
                         onChange={this.handleChange.bind(this, "name")}
                         value={this.state.fields["name"]}
              />
            </div>
            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

            <div className={'form-select-field recipe-difficulty-field'}>
              <p className={'field-name'}>Dificultad</p>
              <TextField className={'form-field'}
                         id="recipe-difficulty"
                         select
                         label="Dificultad"
                         onChange={this.handleChange.bind(this, "difficulty")}
                         value={this.state.fields["difficulty"]}
              >
                {difficulties.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <span style={{ color: "red" }}>{this.state.errors["difficulty"]}</span>

            <div className={'form-select-field'}>
              <p className={'field-name'}>Categoría</p>
              <TextField className={'form-field'}
                         id="recipe-category"
                         select
                         label="Categoría"
                         onChange={this.handleChange.bind(this, "category")}
                         value={this.state.fields["category"]}
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <span style={{ color: "red" }}>{this.state.errors["categories"]}</span>

            <div className={'form-text-area'}>
              <p className={'field-name'}>Ingredientes</p>
              <TextareaAutosize className={'form-field'}
                                minRows={3}
                                placeholder="Todos los ingredientes"
                                onChange={this.handleChange.bind(this, "ingredients")}
                                value={this.state.fields["ingredients"]}
              />
            </div>
            <span style={{ color: "red" }}>{this.state.errors["ingredients"]}</span>

            <div className={'form-text-area'}>
              <p className={'field-name'}>Procedimiento</p>
              <TextareaAutosize className={'form-field'}
                                minRows={3}
                                placeholder="Procedimiento de la receta"
                                onChange={this.handleChange.bind(this, "procedure")}
                                value={this.state.fields["procedure"]}
              />
            </div>
            <span style={{ color: "red" }}>{this.state.errors["procedure"]}</span>

            <div>
              <p className={'field-name'}>Imágenes de la comida</p>

              <Button variant="contained" component="label" color="primary">
                {" "}
                Cargar una imagen
                <input type="file" hidden multiple onChange={this.fileSelectedHandler} />
              </Button>
              <p>{this.state.fields["images"].length} imágenes cargadas</p>
            </div>
            <span style={{ color: "red" }}>{this.state.errors["images"]}</span>

            <div><FormControlLabel
              id="published"
              control={<Checkbox />}
              label="Publicar al guardar"
              onChange={e => {
                this.updateCheckBox(e);
              }}
              checked={this.state.fields["published"]}
              value={this.state.fields["published"]}
            /></div>

            <Button type="submit" variant="contained" className={'save-button'}>Guardar</Button>
          </form>
        </Box>
      </div>
    );
  }
}

export default CreateRecipe;
