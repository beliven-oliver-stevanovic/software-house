import { baseAPIUrl } from '@/config.js'
import axios from 'axios'

const get = async (url) => {
  return await axios
    .get(url)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

const post = async (url, data) => {
  return await axios
    .post(url, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

const patch = async (url, data) => {
  return await axios
    .patch(url, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export const getOne = async (entity, id) => {
  return get(`${baseAPIUrl}/${entity}/${id}`)
}

export const getMany = async (entity) => {
  return get(`${baseAPIUrl}/${entity}`)
}

export const postOne = async (entity, data) => {
  return post(`${baseAPIUrl}/${entity}`, data)
}

export const patchOne = async (entity, id, data) => {
  return patch(`${baseAPIUrl}/${entity}/${id}`, data)
}
