import axios from "axios";

export default axios.create({
  baseURL: "https://frozen-ravine-61703.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});