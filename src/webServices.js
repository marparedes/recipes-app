const urlApi = "http://localhost:8081";

const urlWebServices = {
  getRecipes: `${urlApi}/api/recipes`,
  getRecipe: `${urlApi}/api/recipes/{id}`,
  // login:urlApi +"api/users/login",
  // uploadFileImg: urlApi + "utils/uploadImg",
  // guardarImgUser: urlApi + "api/users/guardarImgUser",
  // getImgUser: urlApi + "api/users/imgUserByMail",
  // uploadFileImg: urlApi + "api/users/uploadImg",
}

export default urlWebServices;
