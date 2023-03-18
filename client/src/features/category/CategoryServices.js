import axios from 'axios'

const BASE_URL = '/api/categories'

const getCategory = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(`${BASE_URL}/${id}`, config)

    return res.data
}

const CategoryServices = {
    getCategory,
}

export default CategoryServices