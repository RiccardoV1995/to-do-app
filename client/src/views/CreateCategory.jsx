import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { reset, createCategory } from '../features/categories/CategoriesSlice'
 
const CreateCategory = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isError, isLoading, message } = useSelector(state => state.categories)

    const [categoryName, setCategoryName] = useState('')

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(reset())
    }, [isError, message, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()

        const categoryData = {categoryName}

        dispatch(createCategory(categoryData))
        toast.success('Nuova categoria creata')
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
        <h1 className="text-2xl text-indigo-600 font-semibold mb-4">Crea una categoria</h1>
        <div className="flex flex-col mb-4">
            <label className="text-lg mb-2">Nome categoria</label>
            <input 
            type="text" 
            placeholder='Inserisci il nome della categoria'
            className="py-2 px-4 bg-gray-100 border-2 border-gray-300 focus:border-indigo-600 outline-none placeholder:italic placeholder:text-gray-500" 
            value={categoryName}
            onChange={(e) => {setCategoryName(e.target.value)}}
            />
        </div>       
        <button 
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white text-lg w-full hover:bg-indigo-700 transition-all"
        >Crea la categoria</button>
        </form>
    </div>
  )
}

export default CreateCategory