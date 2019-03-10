import getCategories from '../services/Category/getCategories';

var CategoriesList = () => {
  return getCategories()
  .then((response) => { return response;})
  .catch((error) => { return {success:false};});
}
export {
  CategoriesList
}
