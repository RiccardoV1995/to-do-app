import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { logout, reset } from '../features/user/UserSlice'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector(state => state.user)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    dispatch(reset())
  }, [user, navigate, dispatch])

  const logoutComand = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className='w-full'>
        <nav className='py-3 px-6 h-[10vh] w-full border-b-2 border-bg-gray-300 flex items-center justify-between'>
          <Link to='/dashboard'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-indigo-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>
          <div className='flex lg:gap-4 gap-2 items-center'>
            <Link to='/profile' className='lg:text-lg'>Profilo</Link>
            <Link to='/categories' className='lg:text-lg'>Categorie</Link>
            <button 
              className='flex items-center gap-1 lg:text-lg text-red-600'
              onClick={logoutComand}
            >
              Logout 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </button>
          </div>
        </nav>
        <Outlet />
        <footer className='w-full h-[10vh] flex items-center justify-center bg-white border-t-2 border-bg-gray-300 text-lg text-indigo-600'>
          <h1>Creato da Riccardo Vercellesi</h1>
        </footer>
    </div>
  )
}

export default DefaultLayout