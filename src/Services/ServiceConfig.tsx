import axios from 'axios'


const BEARER_TOKEN = 'Bearer dQc0W8Sb384CyCcIsQ8UMTrKlCOTf2wHGElAxlkHArfvzjaPsZ'
const PUBLIC_ADDRESS = 'http://localhost:8001/'
const localDomain = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    // timeout: 10000,
})


const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': BEARER_TOKEN,
        // 'auth_token':""
    },
    withCredentials: true
}


const fileUploadHeaders = {
    headers: {
        'Accept': 'application/json',
    }
}



const domain = localDomain


domain.interceptors.response.use(
    response => {
        return response
    },

    error => {
        // console.error(error)
        return error.response
    }
)


export default domain
export {
    headers,
    fileUploadHeaders,
    PUBLIC_ADDRESS
}