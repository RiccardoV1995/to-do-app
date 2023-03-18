import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../features/todos/TodosSlice'
import moment from 'moment'
import 'moment/locale/it'
moment.locale('it')

const Todo = ({todo}) => {
    const dispatch = useDispatch()

    const dateNow = Date.now()

  return (
    <div className={`p-6 border rounded-xl lg:w-[500px] mx-2 shadow-md mb-6 ${dateNow > moment(todo.date).format('x') ? 'bg-red-300 border-red-800' : 'bg-white border-indigo-600 '}`}>
        {dateNow > moment(todo.date).format('x') && <h1 className="text-center mb-4 text-2xl text-red-800 underline font-semibold">!!! Todo scaduto !!!</h1>}
        <div className="flex w-full justify-between items-center">
            <div>
                <h1 className="text-lg text-semibold mb-2">{todo.task}</h1>
                <h2 className="text-indigo-600 mb-2">{moment(todo.date).format('dddd, DD/MM/YYYY')}{todo.time && (`, ${todo.time}`)}</h2>
                <p className="mb-2">{todo.category}</p>
                <h4 className="text-sm italic"><span className="font-semibold">Creato:</span> {moment(todo.createdAt).format('dddd, DD/MM/YYYY')}</h4>
                <h4 className="text-sm italic"><span className="font-semibold">Ultima modifica:</span> {moment(todo.updatedAt).format('dddd, DD/MM/YYYY')}</h4>
            </div>
            <div className="w-1/3">
                <button onClick={() => dispatch(deleteTodo(todo._id))} className="py-2 px-4 text-sm lg:text-lg bg-red-500 hover:bg-red-600 text-white rounded h-fit transition-all w-full mx-2 mb-2 shadow-md">
                    Completato 
                </button>
                <Link 
                    to={`/edit-todo/${todo._id}`} 
                    className="py-2 px-4 text-sm lg:text-lg bg-yellow-500 hover:bg-yellow-600 text-white rounded h-fit transition-all w-full mx-2 block text-center shadow-md"
                >
                    Modifica
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Todo