import { RecipeDetails } from '../components/RecipeDetails'
import recipesMock from '../mock/recipes'

function Recipe() {
  return (
    <RecipeDetails recipe={recipesMock[0]}></RecipeDetails>
  )
}

export default Recipe;
