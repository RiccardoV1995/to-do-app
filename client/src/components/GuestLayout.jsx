import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const GuestLayout = () => {
  const navigate = useNavigate()

  const {user} = useSelector(state => state.user)

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  return (
    <div className='w-full min-h-[100vh] bg-gray-200 flex items-center justify-center'>
        <Outlet />
    </div>
  )
}

export default GuestLayout