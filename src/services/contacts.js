import axios from 'axios';
const URL = '/api/contacts'

let token = null

const getToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(URL)
    return response.data
}
const create = async (newObject) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(URL, newObject, config)
    return response.data
}
const update = async (id, newObject) => {
    const response = await axios.put(`${URL}/${id}`, newObject)
    return response.data
}
const deleteOne = async (id) => {
    const response = await axios.delete(`${URL}/${id}`)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create, update, deleteOne, getToken}

