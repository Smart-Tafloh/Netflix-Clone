import axios from "axios";

//this stands as the base url to make requests to the movie database
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
//if you have a default export you can actually rename it to whatever you want
