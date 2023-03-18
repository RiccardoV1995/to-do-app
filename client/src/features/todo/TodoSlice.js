import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import TodoServices from './TodoServices'

const initialState = {
    todo: null,
    isSuccess: false,
    isLoading: false,
    isError: false,
    messagge: ''
}

export const getTodo = createAsyncThunk('/todo/get', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await TodoServices.getTodoFnc(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        reset: (state) => {
            state.isSuccess = false
            state.isLoading = false
            state.isError = false
            state.messagge = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodo.pending, (state) => {
                state.isLoading = false
            })
            .addCase(getTodo.fulfilled, (state, actions) => {
                state.todo = actions.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(getTodo.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.messagge = actions.payload
            })
    }
})

export const { reset } = TodoSlice.actions
export default TodoSlice.reducer