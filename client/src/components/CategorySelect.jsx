import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { reset, getCategories } from '../features/categories/CategoriesSlice'
import { getTodosByCategory, getTodos } from '../features/todos/TodosSlice'

const CategorySelect = () => {
  const dispatch = useDispatch()

  const { categories, isError, message, isLoading } = useSelector(state => state.categories)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(reset())
    dispatch(getCategories())
  }, [isError, message, dispatch])

  const onChange = (category) => {
    if (category == 'tutti') {
      return dispatch(getTodos())
    }
    dispatch(getTodosByCategory(category))
  }
 
  return (
    <select onChange={(e) => onChange(e.target.value)} className="mt-4 py-3 px-6 border-2 focus:ring-indigo-600 focus:border-indigo-600 text-lg">
        <option>Filtra per categoria</option>
        <option value='tutti' className='text-indigo-600 font-semibold'>tutti</option>
        <option value='generale' className='text-indigo-600 font-semibold'>generale</option>
        {isLoading && (
          <option>Caricamento...</option>
        )}
        {categories.length > 0 && (
          categories.map(category => (
            <option key={category._id} value={category.categoryName}>{ category.categoryName }</option>
          ))
        )}
    </select>
  )
}

export default CategorySelect