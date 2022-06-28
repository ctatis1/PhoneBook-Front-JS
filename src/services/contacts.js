import axios from 'axios';
const URL = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(URL)
    return req.then(response => response.data);
}
const create = (newObject) => {
    const req = axios.post(URL, newObject)
    return req.then(response => response.data);
}
const update = (id, newObject) => {
    const req = axios.put(`${URL}/${id}`, newObject)
    return req.then(response => response.data)
}
const deleteOne = (id) => {
    const req = axios.delete(`${URL}/${id}`)
    return req.then(res => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create, update, deleteOne}

