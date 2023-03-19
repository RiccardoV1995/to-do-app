import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import categoryServices from './CategoriesServices'

const initialState = {
    categories: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: ''
}

export const createCategory = createAsyncThunk('/categories/create', async (categoryData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await categoryServices.createCategoryFnc(categoryData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getCategories = createAsyncThunk('/categories/get_all', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await categoryServices.getCategoriesFnc(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteCategory = createAsyncThunk('/categories/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await categoryServices.deleteCategoryFnc(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const editCategory = createAsyncThunk('/categories/edit', async ({categoryData, id}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await categoryServices.editCategoryFnc(categoryData, id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const CategoriesSlice = createSlice({
    name: 'categories',
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
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true
                })
            .addCase(createCategory.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.message = actions.payload
            })
            .addCase(createCategory.fulfilled, (state, actions) => {
                state.isLoading = false
                state.isSuccess = true
                state.categories.push(actions.payload)
            })
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCategories.fulfilled, (state, actions) => {
                state.categories = actions.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(getCategories.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.message = actions.payload
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCategory.fulfilled, (state, actions) => {
                state.categories = state.categories.filter(category => category._id !== actions.payload.id)
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(deleteCategory.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.message = actions.payload
            })
            .addCase(editCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editCategory.rejected, (state, actions) => {
                state.isLoading = false
                state.isError = true
                state.message = actions.payload
            })
    }
})

export const { reset } = CategoriesSlice.actions
export default CategoriesSlice.reducer