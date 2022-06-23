import React, { useContext } from 'react'
import SearchBar from '../components/SearchBar'
import SearchResult from '../components/SearchResult'
import { ArtistContext } from '../context/ArtistContext';
import "../style/HomePage.css"

export default function HomePage() {
  return (
    <div className='homepage'>
        <SearchBar/>
        <SearchResult/>
    </div>
  )
}
