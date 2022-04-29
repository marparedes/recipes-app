import React, { useEffect, useState } from 'react'
import { RecipeList } from '../components/RecipeList'
import recipesMock from '../mock/recipes'

// TODO busqueda por filtros 
function Home() {

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
      setRecipes(recipesMock)
      
    }, [])
    
  return (
    <RecipeList recipes={recipes}></RecipeList>
  )
}

export default Home