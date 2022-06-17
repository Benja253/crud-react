import axios from 'axios'
import React from 'react'

const CardMovie = ({movie, getAllMovies, URL, setObjectUpdate, setIsShowForm, reset}) => {

  const deleteMovie = id => {
    axios.delete(`${URL}${id}/`)
      .then(res => {
        console.log(res.data)
        getAllMovies()
      })
      .catch(err => console.log(err))
  }

  const updateMovie = () => {
    setIsShowForm(true)

    const obj = {
      duration: movie.duration,
      genre: movie.genre,
      name: movie.name,
      release_date: movie.release_date
    }

    reset(obj)
    setObjectUpdate(movie)
  }

  return (
    <article className='card'>
      <h2>{`#${movie.id} ${movie.name}`}</h2>
      <ul>
        <li><b>Duration: </b>{movie.duration}</li>
        <li><b>Genre: </b>{movie.genre}</li>
        <li><b>Release date: </b>{movie.release_date}</li>
      </ul>
      <button onClick={() => deleteMovie(movie.id)}>Trash</button>
      <button onClick={updateMovie}>Update</button>
    </article>
  )
}

export default CardMovie