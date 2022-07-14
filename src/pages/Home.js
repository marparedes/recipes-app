import { Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AlertMessage } from '../components/AlertMessage';
import { RecipeList } from '../components/RecipeList';
import categories from '../mock/categories';
import urlWebServices from '../webServices';

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);

  const [ingredientQ, setIngredientQ] = useState(null);
  const [categoryQ, setCategoryQ] = useState("Todos");
  const [difficultyQ, setDifficultyQ] = useState("Todos");

  const [recipes, setRecipes] = useState([]);

  const difficultyMock = ["1", "2", "3", "4", "5"];

  useEffect(() => {
    const getRecipes = async () => {
      await fetchRecipes(currentPage);
    }
    try {
      getRecipes().then().catch((error) => {
        console.log("Could not fetch recipes...", error)
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const fetchRecipes = async (currentPage) => {
    setIsLoaded(false);
    let url = `${urlWebServices.getRecipes}?page=${currentPage}&limit=1`;
    if (!!categoryQ && categoryQ !== "Todos") url += `&category=${categoryQ}`;
    if (!!difficultyQ && difficultyQ !== "Todos") url += `&difficulty=${difficultyQ}`;
    if (!!ingredientQ) url += `&ingredients=${ingredientQ}`;
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
    if (parsedResponse.status === 200) {
      setRecipes(currentPage === 1 ? parsedResponse.data.docs : recipes.concat(parsedResponse.data.docs));
      setCurrentPage(parseInt(parsedResponse.data.page));
      setMaxPage(parseInt(parsedResponse.data.pages));
      setIsLoaded(true);
    }
  }

  const handleNewSearch = async () => {
    await fetchRecipes(1);
  }

  const handleSeeMoreSearch = async () => {
    await fetchRecipes(currentPage + 1);
  }

  return <>
    <Typography variant='h6' sx={{ textAlign: "center", marginTop: 10 }}> Búsqueda por:</Typography>
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
        <Button variant="contained" size='large' onClick={handleNewSearch}>Buscar</Button>
      </div>
    </div>
    {recipes.length > 0 ? <RecipeList recipes={recipes}></RecipeList> : <AlertMessage message={"No se encontraron recetas. Por favor, intente nuevamente."} severity={"info"} />}
    {(maxPage !== null && currentPage < maxPage) ?
      <div className='search-more-button'>
        <Button variant="contained" size='large' onClick={handleSeeMoreSearch}>Ver más recetas</Button>
      </div> :
      null
    }
  </>
}

export default Home