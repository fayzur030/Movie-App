import { motion } from 'framer-motion'
import type { Movie } from '../types/Types'
import { Link } from 'react-router-dom'

interface Props {
  movie: Movie
}

const MovieCard = ({ movie }: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      className='bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg cursor-pointer'
    >
      <Link to={`/movie/${movie.id}`}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/500x800?text=No+Image'
          }
          alt={movie.title || 'Movie Poster'}
          className='w-full h-80 object-cover'
        />
        <div className='p-3'>
          <h3 className='font-semibold text-lg'>{movie.title}</h3>
          {movie.vote_average !== undefined && (
            <p className='text-yellow-400'>⭐ {movie.vote_average}</p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default MovieCard
