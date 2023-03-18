import axios from 'axios'

const BASE_URL = '/api/todos'

const getTodosFnc = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(BASE_URL, config)

    return res.data
}

const getTodosByCategoryFnc = async (category, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(`${BASE_URL}/category/${category}`, config)

    return res.data
}

const createTodoFnc = async (todoData , token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.post(BASE_URL, todoData, config)

    return res.data
}

const deleteTodoFnc = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.delete(`${BASE_URL}/${id}`, config)

    return res.data
}

const updateTodoFnc = async (todoData, id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.put(`${BASE_URL}/${id}`, todoData, config)

    return res.data
}

const todosServices = {
    getTodosFnc,
    getTodosByCategoryFnc,
    createTodoFnc,
    deleteTodoFnc,
    updateTodoFnc,
}

export default todosServices