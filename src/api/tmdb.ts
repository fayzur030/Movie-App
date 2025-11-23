// src/api/tmdb.ts
import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

// Axios instance
export const tmdb = axios.create({
  baseURL: BASE_URL,
})

// Trending movies with optional page number (pagination support)
export const getTrendingMovies = (page = 1) =>
  tmdb.get(`/trending/movie/day?api_key=${API_KEY}&page=${page}`)

// Search movies by query with optional page number
export const searchMovies = (query: string, page = 1) =>
  tmdb.get(`/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`)

// Get movie details by ID
export const getMovieDetails = (id: string) =>
  tmdb.get(`/movie/${id}?api_key=${API_KEY}`)
// api/tmdb.ts
export const getMovieVideos = (id: string) =>
  tmdb.get(`/movie/${id}/videos?api_key=${API_KEY}`)
