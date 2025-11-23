import { useEffect, useState } from 'react'
import { getMovieVideos } from '../api/tmdb'

interface Video {
  id: string
  key: string 
  name: string
  site: string
  type: string
}

const MovieTrailer = ({ movieId }: { movieId: string }) => {
  const [videoKey, setVideoKey] = useState<string | null>(null)

  useEffect(() => {
    getMovieVideos(movieId)
      .then((res) => {
        const trailers = res.data.results.filter(
          (v: Video) => v.site === 'YouTube' && v.type === 'Trailer'
        )
        if (trailers.length > 0) setVideoKey(trailers[0].key)
      })
      .catch(console.error)
  }, [movieId])

  if (!videoKey) return <p className='text-white'>Trailer not available</p>

  return (
    <div className='w-full aspect-video p-2'>
      <iframe
        className='w-full h-full'
        src={`https://www.youtube.com/embed/${videoKey}`}
        title='Movie Trailer'
        frameBorder='0'
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default MovieTrailer
