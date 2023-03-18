import axios from "axios";

const BASE_URL = '/api/categories'

const createCategoryFnc = async (categoryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.post(BASE_URL, categoryData, config)

    return res.data
}

const getCategoriesFnc = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(BASE_URL, config)

    return res.data
}

const deleteCategoryFnc = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.delete(`${BASE_URL}/${id}`, config)

    return res.data
}

const editCategoryFnc = async (categoryData, id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const res = await axios.put(`${BASE_URL}/${id}`, categoryData, config)

    return res.data
}

const categoriesServices = {
    createCategoryFnc,
    getCategoriesFnc,
    deleteCategoryFnc,
    editCategoryFnc,
}

export default categoriesServices