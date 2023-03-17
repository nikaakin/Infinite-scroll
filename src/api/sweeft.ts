import axios from "axios";

export const sweeftApi = axios.create({
  baseURL: "http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/",
});
