import Api from '../../config/api.json';

var getCategories = () => {
  this.url = Api.ApiURL + "/Categories";
  return fetch(this.url)
         .then((response) => response.json())
         .then((responseJson) => {return { success: true, data: responseJson};})
         .catch((error) => { console.log("Can't get categories."); return { success:false};});
}
export default getCategories;
