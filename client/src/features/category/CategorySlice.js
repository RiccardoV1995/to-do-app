import { createSlice, createAsyncThunk } from'@reduxjs/toolkit'

import CategoryServices from './CategoryServices'

const initialState = {
    category: null,
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: ''
}

export const getCategory = createAsyncThunk('/category/get_category', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await CategoryServices.getCategory(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const CategorySlice = createSlice({
    name: 'category',
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
            .addCase(getCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCategory.fulfilled, (state, actions) => {
                state.category = actions.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(getCategory.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.message = actions.payload
            })
    }
})

export const { reset } = CategorySlice.actions
export default CategorySlice.reducer