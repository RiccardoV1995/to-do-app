import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import {reset, register} from '../features/user/UserSlice'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.user)

  useEffect(() => {
    if(isSuccess || user) {
      navigate('/dashboard')
      toast.success('Utente registrato')
    }

    if(isError) {
      toast.error(message)
    }

    dispatch(reset())
  }, [reset, dispatch, isSuccess, user, navigate])

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return 
    }

    const userData = {
      username,
      email,
      password
    }

    dispatch(register(userData))
  }

  if (isLoading) {
    return (
      <h1 className="text-2xl font-semibold">Caricamento...</h1>
    )
  }

  return (
    <form onSubmit={onSubmit} className="p-6 bg-white lg:w-[400px] w-full mx-4 shadow-md">
      <h1 className="text-2xl text-indigo-600 font-semibold mb-4">Crea un account</h1>
      <div className="flex flex-col mb-4">
        <label className="text-lg mb-2">Username</label>
        <input 
          type="text" 
          placeholder='Inserisci il tuo username'
          className="py-2 px-4 bg-gray-100 border-2 border-gray-300 focus:border-indigo-600 outline-none placeholder:italic placeholder:text-gray-500" 
          value={username}
          onChange={(e) => {setUsername(e.target.value)}}
         />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-lg mb-2">Email</label>
        <input 
          type="email" 
          placeholder='Inserisci una email valida'
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
      <div className="flex flex-col mb-4">
        <label className="text-lg mb-2">Conferma password</label>
        <input 
          type="Password" 
          placeholder='Rinserisci la tua password'
          className="py-2 px-4 bg-gray-100 border-2 border-gray-300 focus:border-indigo-600 outline-none placeholder:italic placeholder:text-gray-500" 
          value={confirmPassword}
          onChange={(e) => {setConfirmPassword(e.target.value)}}
        />
      </div>
      <p className="mb-4">Hai già un account? Accedi <Link className="text-indigo-600 font-semibold underline" to='/login'>qui</Link></p>
      <button 
        type="submit"
        className="py-2 px-4 bg-indigo-600 text-white text-lg w-full hover:bg-indigo-700 transition-all"
      >Registrati</button>
    </form>
  )
}

export default Register