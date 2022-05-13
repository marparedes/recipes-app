import { Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertMessage } from '../components/AlertMessage'
import { RecipeList } from '../components/RecipeList'
import categories from '../mock/categories'
import recipesMock from '../mock/recipes'

function Home() {

  const [params, setParams] = useSearchParams()

  const [ingredientQ, setIngredientQ] = useState(null)
  const [categoryQ, setCategoryQ] = useState("Todos")
  const [difficultyQ, setDifficultyQ] = useState("Todos")

  const [recipes, setRecipes] = useState([])

  const difficultyMock = ["1", "2", "3", "4", "5"]

  useEffect(() => {
    if (hasParams(params)) {
      var filteredRecipes = [...recipesMock]
      if (params.get("category")) {
        var categoryFilter = filteredRecipes.filter(recipe => recipe.category === params.get("category"));
        filteredRecipes = categoryFilter;

      }
      if (params.get("difficulty")) {
        var diffcicultyFilter = filteredRecipes.filter(recipe => recipe.difficulty === parseInt(params.get("difficulty")));
        filteredRecipes = diffcicultyFilter;
      }
      if (params.get("ingredient")) {
        var ingredientFilter = filteredRecipes.filter(recipe => {
          var item = recipe.ingredients.split('\n').map(ingredient => ingredient.includes(params.get("ingredient")))
          return (item.includes(true))
        });
        filteredRecipes = ingredientFilter;
      }
      setRecipes(filteredRecipes)
    } else {
      setRecipes(recipesMock)
    }
  }, [params])


  const hasParams = params => params.has("category") || params.has("difficulty") || params.has("ingredient")

  const addParams = () => {
    let paramsQuery = {}
    if (categoryQ && categoryQ !== "Todos") {
      paramsQuery.category = categoryQ
    }
    if (difficultyQ && difficultyQ !== "Todos") {
      paramsQuery.difficulty = difficultyQ
    }
    if (ingredientQ) {
      paramsQuery.ingredient = ingredientQ
    }
    setParams(paramsQuery)
  }

  return <>
    <Typography variant='h6' sx={{textAlign:"center", marginTop:10}}> Búsqueda por:</Typography>
    <div className='search-container'>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Button sx={{ display: 'block' }}> Ingrediente </Button>
        <TextField id="outlined-size-small" onChange={e => {
          setIngredientQ(e.target.value)
        }} />
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Typography className='search-typo' color="primary.main"> DIFICULTAD </Typography>
        <Select
          value={difficultyQ}
          onChange={e => {
            setDifficultyQ(e.target.value);
          }}
          defaultValue={true}
          displayEmpty
        >
          <MenuItem value="Todos">
            <em>Todos</em>
          </MenuItem>
          {difficultyMock.map(item => <MenuItem value={item}> {item} </MenuItem>)}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Typography className='search-typo' color="primary.main"> CATEGORIA </Typography>
        <Select
          value={categoryQ}
          onChange={e => {
            setCategoryQ(e.target.value);
          }}
          defaultValue={true}
          displayEmpty
        >
          <MenuItem value="Todos">
            <em>Todos</em>
          </MenuItem>
          {categories.map(item => <MenuItem value={item}> {item} </MenuItem>)}
        </Select>
      </FormControl>
      <div className='search-button'>
        <Button variant="contained" size='large' onClick={addParams}>Buscar</Button>
      </div>
    </div>
    {recipes.length > 0 ? <RecipeList recipes={recipes}></RecipeList> : <AlertMessage message={"No se encontraron recetas. Por favor, intente nuevamente."} severity={"info"} />}
    
  </>
}

export default Home