const urlApi = "http://localhost:8081";

const urlWebServices = {
  login: `${urlApi}/api/login`,
  getUser: `${urlApi}/api/users`,
  postUser: `${urlApi}/api/users`,
  putUser: `${urlApi}/api/users`,
  putNewPassword: `${urlApi}/api/users/new-password`,
  getRecipes: `${urlApi}/api/recipes`,
  getMyRecipes: `${urlApi}/api/my-recipes`,
  postRecipe: `${urlApi}/api/recipes`,
  getRecipe: `${urlApi}/api/recipes/{id}`,
  putRecipe: `${urlApi}/api/recipes/{id}`,
  deleteRecipe: `${urlApi}/api/recipes/{id}`,
  postScore: `${urlApi}/api/recipes/{id}/scores`,
  // uploadFileImg: urlApi + "utils/uploadImg",
  // guardarImgUser: urlApi + "api/users/guardarImgUser",
  // getImgUser: urlApi + "api/users/imgUserByMail",
  // uploadFileImg: urlApi + "api/users/uploadImg",
}

export default urlWebServices;
