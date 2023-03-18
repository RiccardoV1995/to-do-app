import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { getTodos, reset } from '../features/todos/TodosSlice'

import CategorySelect from "../components/CategorySelect"
import Todo from "../components/Todo"

const Dashboard = () => {
  const dispatch = useDispatch()

  const { todos, isError, message, isLoading } = useSelector(state => state.todos)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(reset())
    dispatch(getTodos())
  }, [isError, message, dispatch])

  if (isLoading) {
    return (
      <h1 className="text-2xl font-semibold min-h-[90vh] mx-auto text-center mt-20">Caricamento...</h1>
    )
  }
 
  return (
    <div className='w-full min-h-[90vh] flex flex-col items-center relative bg-gray-100'>
      <Link
        to='/create-todo'
        className="text-indigo-600 absolute top-4 right-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </Link>
      <CategorySelect />
      <div className="flex flex-col gap-4 mt-10">

          {todos.length > 0 ? (
            (todos.map(todo => (
              <Todo todo={todo} key={todo._id} />
            )))
          ) : (
            <h1 className="mt-10 text-xl">Nessun todo ancora creato. Per crearne uno clicca <Link to="/create-todo" className="text-indigo-600 underline">qui</Link></h1>
          )}
        </div>

    </div>
  )
}

export default Dashboard