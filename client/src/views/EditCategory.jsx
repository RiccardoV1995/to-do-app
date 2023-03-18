import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getCategory, reset } from '../features/category/CategorySlice'
import { editCategory } from '../features/categories/CategoriesSlice'

const EditCategory = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()

    const [categoryName, setCategoryName] = useState('')

    const { category, isLoading } = useSelector(state => state.category)
    const { isError, message } = useSelector(state => state.categories)

    useEffect(() => {
        if (isError) {
            toast.isError(message)
        }

        dispatch(reset())
        dispatch(getCategory(id))
    }, [isError, message, id, dispatch])

    useEffect(() => {
        setCategoryName( isLoading || !category ? '' : category.categoryName )
    }, [isLoading, category])

    const onSubmit = (e) => {
        e.preventDefault()

        const categoryData = { categoryName }

        dispatch(editCategory({ categoryData, id }))
        navigate('/categories')
    }
 
    if (isLoading) {
        return (
          <h1 className="text-2xl font-semibold">Caricamento...</h1>
        )
      }
    
  return (
    <div className="min-h-[90vh] w-full flex items-center justify-center bg-gray-100">
        <form onSubmit={onSubmit} className="p-6 bg-white lg:w-[450px] w-full mx-4 shadow-md py-6 relative bottom-10">
        <h1 className="text-2xl text-indigo-600 font-semibold mb-4">Modifica categoria</h1>
        <div className="flex flex-col mb-4">
            <label className="text-lg mb-2">Nuovo nome categoria</label>
            <input 
            type="text" 
            placeholder='Inserisci il nome della categoria'
            className="py-2 px-4 bg-gray-100 border-2 border-gray-300 focus:border-indigo-600 outline-none placeholder:italic placeholder:text-gray-500" 
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            />
        </div>       
        <button 
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white text-lg w-full hover:bg-indigo-700 transition-all"
        >Modifica la categoria</button>
        </form>
    </div>
  )
}

export default EditCategory