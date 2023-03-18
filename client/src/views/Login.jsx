import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

import { login, reset } from '../features/user/UserSlice'
 
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {user, isSuccess, isLoading, isError, message} = useSelector(state => state.user)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    
    if (user || isSuccess) {
      navigate('/dashboard')
    }

    dispatch(reset())
  }, [user, isSuccess, navigate, isError, message, dispatch])

  const onSubmit = async (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

      dispatch(login(userData))
  }

  if (isLoading) {
    return (
      <h1 className="text-2xl font-semibold">Caricamento...</h1>
    )
  }

  return (
    <form onSubmit={onSubmit} className="p-6 bg-white lg:w-[400px] w-full mx-4 shadow-md">
      <h1 className="text-2xl text-indigo-600 font-semibold mb-4">Accedi al tuo account</h1>
      {message}
      <div className="flex flex-col mb-4">
        <label className="text-lg mb-2">Email</label>
        <input 
          type="email" 
          placeholder='Inserisci la tua email'
          className="py-2 px-4 bg-gray-100 border-2 border-gray-300 focus:border-indigo-600 outline-none placeholder:italic placeholder:text-gray-500" 
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
         />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-lg mb-2">Password</label>
        <input 
          type="Password" 
          placeholder='Password'
          className="py-2 px-4 bg-gray-100 border-2 border-gray-300 focus:border-indigo-600 outline-none placeholder:italic placeholder:text-gray-500" 
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
        />
      </div>
      <p className="mb-4">Non hai ancora un account? Registrati <Link className="text-indigo-600 font-semibold underline" to='/register'>qui</Link></p>
      <button 
        type="submit"
        className="py-2 px-4 bg-indigo-600 text-white text-lg w-full hover:bg-indigo-700 transition-all"
      >Login</button>
    </form>
  )
}

export default Login