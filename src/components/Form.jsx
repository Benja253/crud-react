import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const Form = ({createMovie, updateMovieById, objectUpdate, handleSubmit, reset, register}) => {

  const defaultValuesForm = {
    duration: "",
    genre: "",
    name: "",
    release_date: ""
  }

  const submit = data => {
    if(objectUpdate.id !== undefined){
      updateMovieById(objectUpdate.id, data)
      reset(defaultValuesForm)
    } else {
      createMovie(data)
    }
    reset(defaultValuesForm)
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id='name' {...register('name')} />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <input type="text" id='genre' {...register('genre')} />
        </div>
        <div>
          <label htmlFor="duration">Duration</label>
          <input type="text" id='duration' {...register('duration')} />
        </div>
        <div>
          <label htmlFor="date">Release Date</label>
          <input type="date" id='date' {...register('release_date')} />
        </div>
        <button>Submit</button>
      </form>
  )
}

export default Form