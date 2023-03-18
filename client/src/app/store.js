import { configureStore } from '@reduxjs/toolkit';
import UserSlice from '../features/user/UserSlice'
import CategoriesSlice from '../features/categories/CategoriesSlice';
import CategorySlice from '../features/category/CategorySlice';
import TodosSlice from '../features/todos/TodosSlice';
import TodoSlice from '../features/todo/TodoSlice';

export const store = configureStore({
  reducer: {
    user: UserSlice,
    categories: CategoriesSlice,
    category: CategorySlice,
    todos: TodosSlice,
    todo: TodoSlice,
  },
});
