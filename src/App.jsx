import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import CardMovie from './components/CardMovie'
import Form from './components/Form'
import { useForm } from 'react-hook-form'

const URL = 'https://movies-crud-academlo.herokuapp.com/movies/'

function App() {

  const {handleSubmit, register, reset} = useForm()

  const [movies, setMovies] = useState()
  const [isShowForm, setIsShowForm] = useState(false)
  const [objectUpdate, setObjectUpdate] = useState()

  const getAllMovies = () => {
    axios.get(URL)
      .then(res => setMovies(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllMovies()
  }, [])

  const createMovie = newMovie => {
    axios.post(URL, newMovie)
      .then(res => {
        console.log(res.data)
        getAllMovies()
      })
      .catch(err => console.log(err))
  }

  const updateMovieById = (id, updateMovie) => {

    axios.patch(`${URL}${id}/`, updateMovie)
      .then(res => {
        console.log(res.data)
        getAllMovies()
        setObjectUpdate()
        setIsShowForm(false)
      })
      .catch(err => console.log(err))
  }

  const showForm = () => {
    const obj = {
      duration: "",
      genre: "",
      name: "",
      release_date: ""
    }
    reset(obj)
    setIsShowForm(!isShowForm)
  }

  return (
    <div className="App">
      <div>
        <button onClick={showForm}>{isShowForm ? 'Hide Form' :'Create a new Movie'}</button>
      </div>
      <div>
        {
          isShowForm && 
          <Form 
            createMovie={createMovie}
            updateMovieById={updateMovieById}
            objectUpdate={objectUpdate}
            handleSubmit={handleSubmit}
            reset={reset}
            register={register}
          />
        }
      </div>
      {
        movies?.map(movie => (
          <CardMovie
            key={movie.id}
            movie={movie}
            URL={URL}
            getAllMovies={getAllMovies}
            setObjectUpdate={setObjectUpdate}
            setIsShowForm={setIsShowForm}
            reset={reset}
          />
        ))
      }
    </div>
  )
}

export default App
