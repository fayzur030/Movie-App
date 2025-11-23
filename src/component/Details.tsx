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
    <section className='bg-gray-900 min-h-screen flex justify-center items-start p-4 md:p-8'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='flex flex-col md:flex-row gap-6 max-w-6xl w-full'
      >
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className='w-full md:w-80 rounded shadow-xl mx-auto md:mx-0'
        />

        {/* Movie Details */}
        <div className='flex-1 text-white'>
          <h1 className='text-3xl md:text-4xl font-bold mb-4'>{movie.title}</h1>
          <p className='text-yellow-400 mb-3 text-lg'>
            ⭐ {movie.vote_average}
          </p>
          <p className='text-gray-300 mb-6'>{movie.overview}</p>

          {!showTrailer && (
            <button
              onClick={() => setShowTrailer(true)}
              className='inline-block mt-4 md:mt-8 px-6 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition'
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
