import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Netflix from './pages/Netflix'
import Signup from './pages/Signup'
import Player from './pages/Player'
import Movies from './pages/Movies'
import TVshows from './pages/TVshows'
import UserListedMovies from './pages/UserListedMovies'

export default function App() {
  return (
   <BrowserRouter>
      <Routes>
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/signup' element={<Signup/>} />
          <Route exact path='/player' element={<Player/>}/>
          <Route exact path='/' element={<Netflix/>} />
          <Route exact path='/movies' element={<Movies/>} />
          <Route exact path='/tv' element={<TVshows/>} />
          <Route exact path='/mylist' element={<UserListedMovies/>} />
      </Routes>
   </BrowserRouter>
  )
}
