import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getMovieDetails } from '../api/tmdb'
import { motion } from 'framer-motion'
import type { Movie } from '../types/Types'
import MovieTrailer from './MovieTrailer'

const Details = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {
    if (id) {
      getMovieDetails(id).then((res) => setMovie(res.data))
    }
  }, [id])

  if (!movie) return <h2 className='text-white p-6'>Loading...</h2>

  return (
    <section className=' bg-gray-900 h-screen'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='p-6 text-white flex gap-6 '
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className='w-80 rounded shadow-xl'
        />

        <div>
          <h1 className='text-4xl font-bold mb-4'>{movie.title}</h1>
          <p className='text-yellow-400 mb-3'>⭐ {movie.vote_average}</p>
          <p className='max-w-xl text-gray-300'>{movie.overview}</p>

          {!showTrailer && (
            <button
              onClick={() => setShowTrailer(true)}
              className='inline-block mt-8 px-6 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition '
            >
              Watch Trailer
            </button>
          )}

          {showTrailer && <MovieTrailer movieId={id!} />}
        </div>
      </motion.div>
    </section>
  )
}

export default Details
