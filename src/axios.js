import Axios from 'axios'
import { apiURL } from './config'

const axios = Axios.create({
  baseURL: apiURL,
  timeout: 60000,
  headers: {
    Accept: 'application/json'
  }
})

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

export default axios
