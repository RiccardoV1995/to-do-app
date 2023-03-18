import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { createTodo, reset } from '../features/todos/TodosSlice'

const CreateTodo = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isError, message, isLoading } = useSelector(state => state.todos)
    const { categories } = useSelector(state => state.categories)

    const [task, setTask] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    useEffect(() => {
        dispatch(reset())

        if (isError) {
            toast.error(message)
        }
    }, [isError, message, dispatch, navigate])

    const onSubmit = (e) => {
        e.preventDefault()

        const todoData = {
            task,
            category,
            date,
            time
        }

        dispatch(createTodo(todoData))
        toast.success('Todo creato con successo')
        navigate('/dashboard')
    }

    if (isLoading) {
        return (
          <h1 className="text-2xl font-semibold min-h-[90vh] mx-auto text-center mt-20">Caricamento...</h1>
        )
      }

  return (
    <div className="min-h-[90vh] w-full flex items-center justify-center bg-gray-100 py-6">
        <form onSubmit={onSubmit} className="p-6 bg-white lg:w-[450px] w-full mx-4 shadow-md">
        <h1 className="text-2xl text-indigo-600 font-semibold mb-4">Crea un todo</h1>
        <div className="flex flex-col mb-4">
            <label className="text-lg mb-2">Cosa devi fare</label>
            <input 
            type="text" 
            placeholder='Inserisci il nome del todo'
            className="py-2 px-4 bg-gray-100 border-2 border-gray-300 focus:border-indigo-600 outline-none placeholder:italic placeholder:text-gray-500" 
            value={task}
            onChange={(e) => {setTask(e.target.value)}}
            />
        </div>
        <div className="flex flex-col mb-4">
            <label className="text-lg mb-2">Scegli una categoria</label>
            <select 
                className="py-2 px-4 bg-gray-100 border-2 border-gray-300 focus:border-indigo-600 outline-none placeholder:italic placeholder:text-gray-500" 
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Seleziona una categoria</option>
                {categories.length > 0 && (
                        categories.map(category => (
                        <option key={category._id} value={category.categoryName}>{category.categoryName}</option>
                    ))
                )}
            </select>
            <small className="italic mt-2">Se non specificato, di default sarà aggiunta la categoria "generale".</small>
        </div>
        <div className="flex flex-col mb-4">
            <label className="text-lg mb-2">Data</label>
            <input 
                type="date" 
                className="py-2 px-4 bg-gray-100 border-2 border-gray-300 focus:border-indigo-600 outline-none placeholder:italic placeholder:text-gray-500" 
                value={date}
                onChange={(e) => {setDate(e.target.value)}}
            />
        </div>
        <div className="flex flex-col mb-4">
            <label className="text-lg mb-2">Orario</label>
            <input 
                type="time" 
                className="py-2 px-4 bg-gray-100 border-2 border-gray-300 focus:border-indigo-600 outline-none placeholder:italic placeholder:text-gray-500" 
                value={time}
                onChange={(e) => {setTime(e.target.value)}}
            />
            <small className="italic mt-2">Campo non obbligatorio.</small>
        </div>
        <button 
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white text-lg w-full hover:bg-indigo-700 transition-all"
        >Crea il todo</button>
        </form>
    </div>
  )
}

export default CreateTodo