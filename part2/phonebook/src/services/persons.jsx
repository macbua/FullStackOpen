import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

export const Getting = () =>{
    return axios.get(baseURL).then(response => response.data)
}

export const Creating = (obj) =>{
    return axios.post(baseURL, obj).then(response => response.data)
}

export const Addinger = (id, obj) =>{
    return axios.put(`${baseURL}/${id}`, obj).then(response => response.data)
}

export const Deleting = (id) =>{
    return axios.delete(`${baseURL}/${id}`)
}