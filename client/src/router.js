import {createBrowserRouter, Navigate} from 'react-router-dom'

import DefaultLayout from './components/DefaultLayout'
import GuestLayout from './components/GuestLayout'

import {Categories, CreateCategory, CreateTodo ,Dashboard, EditCategory, EditTodo, Login, NotFound, Profile, Register} from './views/index'

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/dashboard' />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/create-todo',
                element: <CreateTodo />
            },
            {
                path: '/create-category',
                element: <CreateCategory />
            },
            {
                path: '/edit-todo/:id',
                element: <EditTodo />
            },
            {
                path: '/edit-category/:id',
                element: <EditCategory />
            },
            {
                path: '/categories',
                element: <Categories />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router