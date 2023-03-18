import axios from 'axios'

const BASE_URL = '/api/users'

const registerFnc = async (userData) => {
    const res = await axios.post(BASE_URL, userData)

    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

const loginFnc = async (userData) => {
    const res = await axios.post(`${BASE_URL}/login`, userData)
    console.log(res)

    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    
    return res.data
}

const logoutFnc = () => {
    localStorage.removeItem('user')
} 

const deleteFnc = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.delete(BASE_URL, config)

    if (res.data) {
        localStorage.removeItem('user')
    }

    return res.data
}

const updateFnc = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.put(BASE_URL, userData, config)

    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

const updatePasswordFnc = async (userDataPassword, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.put(`${BASE_URL}/password-update`, userDataPassword, config)

    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}
 
const userServices = {
    registerFnc,
    logoutFnc,
    loginFnc,
    deleteFnc,
    updateFnc,
    updatePasswordFnc,
}

export default userServices