import { useParams } from 'react-router-dom'
import { RecipeDetails } from '../components/RecipeDetails'
import recipesMock from '../mock/recipes'

function Recipe() {

  const { id } = useParams()

  const getRecipeById = () => {
    var filtered = recipesMock.find(recipe => recipe.id === parseInt(id))
    return filtered
  }

  return (
    <RecipeDetails recipe={getRecipeById()}></RecipeDetails>
  )
}

export default Recipe;
