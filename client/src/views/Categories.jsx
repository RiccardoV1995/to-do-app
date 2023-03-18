import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"
import { toast } from 'react-toastify'

import { reset, getCategories } from '../features/categories/CategoriesSlice'

import Category from "../components/Category"

const Categories = () => {
    const dispatch = useDispatch()

    const {categories, isLoading, isError, message} = useSelector(state => state.categories)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(reset())
        dispatch(getCategories())
    }, [isError, message, dispatch])

    if (isLoading) {
        return (
          <h1 className="text-2xl font-semibold text-center py-8">Caricamento...</h1>
        )
      }

  return (
    <div className="min-h-[90vh] w-full bg-gray-100 py-6 relative">
        <Link
            to='/create-category'
            className="text-indigo-600 absolute top-4 right-4"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </Link>
        <h1 className="text-center my-6 text-3xl text-indigo-600 font-semibold">Manager categorie</h1>
        <table className="mx-auto text-left p-4 shadow-md">
            <thead className="bg-gray-200 border-b-2 border-gray-300">
                <tr>
                    <th scope="col" class="px-6 py-3" >Posizione</th>
                    <th scope="col" class="px-6 py-3 w-[200px]">Categoria</th>
                    <th scope="col" class="px-6 py-3">Azioni</th>
                </tr>
            </thead>
            <tbody className="bg-white">
                {categories.length > 0 ? (
                    (categories.map((category, key) => (
                        <Category key={category._id} category={category} position={key} />
                    )))
                ) : (
                    <tr>
                        <td colspan="3" className="px-6 py-3 text-center text-lg font-semibold">Nessuna categoria creata</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default Categories