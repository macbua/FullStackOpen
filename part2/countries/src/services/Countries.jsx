import axios from 'axios'

const baseURL = import.meta.env.VITE_COUNTRIES_URL;
const whetherURL = import.meta.env.VITE_WHETHER_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const GetAll = () =>{
    return axios.get(baseURL).then(response => response.data)
}

export const GetWeather = (name) =>{
    return axios.get(`${whetherURL}${name}&appid=${apiKey}`)
}