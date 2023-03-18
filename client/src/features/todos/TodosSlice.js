import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import todosServices from './TodosServices'

const initialState = {
    todos: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: ''
}

export const getTodos = createAsyncThunk('/todos/get_all', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await todosServices.getTodosFnc(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getTodosByCategory = createAsyncThunk('/todos/category', async (category, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await todosServices.getTodosByCategoryFnc(category, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const createTodo = createAsyncThunk('/todos/create', async (todoData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await todosServices.createTodoFnc(todoData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteTodo = createAsyncThunk('/todos/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await todosServices.deleteTodoFnc(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const updateTodo = createAsyncThunk('/todos/update', async ({todoData, id}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await todosServices.updateTodoFnc(todoData, id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const TodosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        reset: (state) => {
            state.isSuccess = false
            state.isLoading = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTodos.fulfilled, (state, actions) => {
                state.todos = actions.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(getTodos.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.message = actions.payload
            })
            .addCase(getTodosByCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTodosByCategory.fulfilled, (state, actions) => {
                state.todos = actions.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(getTodosByCategory.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.message = actions.payload
            })
            .addCase(createTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTodo.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.message = actions.payload
            })
            .addCase(deleteTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTodo.fulfilled, (state, actions) => {
                state.todos = state.todos.filter(todo => todo._id !== actions.payload.id)
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(deleteTodo.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.message = actions.payload
            })
            .addCase(updateTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTodo.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.message = actions.payload
            })
    }
}) 

export const { reset } = TodosSlice.actions
export default TodosSlice.reducer