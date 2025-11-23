import { useState } from 'react'

interface Props {
  onSearch: (text: string) => void
}

const Navbar = ({ onSearch }: Props) => {
  const [text, setText] = useState('')

  return (
    <div className='w-full bg-gray-900 text-white p-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 sticky top-0 z-50'>
      {/* Logo */}
      <h1 className='text-2xl font-bold text-center sm:text-left'>
        🎬 Movie Box
      </h1>

      {/* Search Input */}
      <input
        type='text'
        placeholder='Search...'
        className='px-4 py-2 rounded bg-gray-800 outline-none w-full sm:w-64 transition-all duration-200 focus:w-full sm:focus:w-72'
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          onSearch(e.target.value)
        }}
      />
    </div>
  )
}

export default Navbar
