import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { deleteUser, reset, update, updatPassword } from '../features/user/UserSlice'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isSuccess, isError, message, isLoading} = useSelector(state => state.user)

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }

    if (isSuccess) {
      toast.success('Utente aggiornato')
      dispatch(reset())
    }
  }, [isError, isSuccess, message, dispatch])

  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const deleteCommand = () => {
    if (window.confirm("Sei sicuro di voler eliminare l'account?")) {
      dispatch(deleteUser())

      toast.success('Account cancellato correttamente')
      navigate('/login')
    }
  }

  if (isLoading || !user) {
    return (
      <h1 className="text-2xl font-semibold min-h-[90vh] mx-auto text-center mt-20">Caricamento...</h1>
    )
  }

  const updateUserCommand = (e) => {
    e.preventDefault()

    const userData = {
      username,
      email
    }

    dispatch(update(userData))
  }

  const updatePasswordCommand = (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      return toast.error('Errore conferma password')
    }

    const userDataPassword = {
      oldPassword,
      newPassword
    }

    dispatch(updatPassword(userDataPassword))

    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="min-h-[90vh] w-full flex flex-col items-center bg-gray-100 p-6 gap-6">
    
      <form onSubmit={updateUserCommand} className="p-6 bg-white lg:w-[400px] w-full mx-4 shadow-md">
        <h1 className="text-2xl text-indigo-600 font-semibold mb-4">Aggiorna dati profilo</h1>
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
            onChange={(e) => {setEmail(e.target.email)}}
          />
        </div>
        <button 
          type="submit"
          className="py-2 px-4 bg-indigo-600 text-white text-lg w-full hover:bg-indigo-700 transition-all"
        >Aggiorna</button>
      </form>

      <form onSubmit={updatePasswordCommand} className="p-6 bg-white lg:w-[400px] w-full mx-4 shadow-md">
        <h1 className="text-2xl text-indigo-600 font-semibold mb-4">Aggiorna password</h1>
        <div className="flex flex-col mb-4">
          <label className="text-lg mb-2">Vecchia password</label>
          <input 
            type="Password" 
            placeholder="Inserisci l'attuale password"
            className="py-2 px-4 bg-gray-100 border-2 border-gray-300 focus:border-indigo-600 outline-none placeholder:italic placeholder:text-gray-500" 
            value={oldPassword}
            onChange={(e) => {setOldPassword(e.target.value)}}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg mb-2">Nuova password</label>
          <input 
            type="Password" 
            placeholder='Nuova password'
            className="py-2 px-4 bg-gray-100 border-2 border-gray-300 focus:border-indigo-600 outline-none placeholder:italic placeholder:text-gray-500" 
            value={newPassword}
            onChange={(e) => {setNewPassword(e.target.value)}}
          /> 
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg mb-2">Conferma password</label>
          <input 
            type="Password" 
            placeholder='Ripeti password password'
            className="py-2 px-4 bg-gray-100 border-2 border-gray-300 focus:border-indigo-600 outline-none placeholder:italic placeholder:text-gray-500" 
            value={confirmPassword}
            onChange={(e) => {setConfirmPassword(e.target.value)}}
          />
        </div>
        <button 
          type="submit"
          className="py-2 px-4 bg-indigo-600 text-white text-lg w-full hover:bg-indigo-700 transition-all"
        >Aggiorna</button>
      </form>

      <button 
        className='lg:w-[400px] w-full py-2 px-4 bg-red-500 text-white text-lg hover:bg-red-600 transition-all shadow-md'
        onClick={deleteCommand}
      >
        Elimina account
      </button>

    </div>
  )
}

export default Profile