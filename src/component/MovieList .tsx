import type { Movie } from '../types/Types'
import MovieCard from './MovieCard'

interface MovieListProps {
  movies: Movie[]
  imageBaseUrl: string
}
export default function MovieList({ movies, imageBaseUrl }: MovieListProps) {
  return (
    <div className='grid md:grid-cols-4 gap-6 p-6'>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} imageBaseUrl={imageBaseUrl} />
      ))}
    </div>
  )
}
