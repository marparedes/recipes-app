const urlApi = "http://localhost:8081";

const urlWebServices = {
  login: `${urlApi}/api/login`,
  getRecipes: `${urlApi}/api/recipes`,
  getMyRecipes: `${urlApi}/api/my-recipes`,
  getRecipe: `${urlApi}/api/recipes/{id}`,
  deleteRecipe: `${urlApi}/api/recipes/{id}`,
  // uploadFileImg: urlApi + "utils/uploadImg",
  // guardarImgUser: urlApi + "api/users/guardarImgUser",
  // getImgUser: urlApi + "api/users/imgUserByMail",
  // uploadFileImg: urlApi + "api/users/uploadImg",
}

export default urlWebServices;
