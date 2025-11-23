import { useEffect, useState, useCallback } from 'react'
import { getTrendingMovies, searchMovies } from '../api/tmdb'
import MovieCard from './MovieCard'
import type { Movie } from '../types/Types'
import Navbar from './Navbar'

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  const fetchMovies = useCallback(async (p = 1, q = '') => {
    setLoading(true)
    try {
      const res = q ? await searchMovies(q, p) : await getTrendingMovies(p)
      setMovies((prev) =>
        p === 1 ? res.data.results : [...prev, ...res.data.results]
      )
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setMovies([])
    setPage(1)
    fetchMovies(1, query)
  }, [query, fetchMovies])

  useEffect(() => {
    if (page === 1) return
    fetchMovies(page, query)
  }, [page, query, fetchMovies])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading
      ) {
        setPage((prev) => prev + 1)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading])

  const handleSearch = (text: string) => {
    setQuery(text)
  }

  return (
    <div className='bg-black min-h-screen'>
      <Navbar onSearch={handleSearch} />

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-6'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {loading && <p className='text-white text-center mb-5'>Loading...</p>}
    </div>
  )
}

export default Home
