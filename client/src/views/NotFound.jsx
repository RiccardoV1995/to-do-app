import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='h-[100vh] w-full flex flex-col items-center justify-center bg-gray-100'>
      <h2 className='text-3xl text-gray-800'><span className='text-indigo-600'>404 - </span>Pagina non trovata</h2>
      <Link to="/" className='text-3xl text-indigo-600 underline mt-4'>Ritorna al sito</Link>
    </div>
  )
}

export default NotFound