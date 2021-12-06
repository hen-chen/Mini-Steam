import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const GetGames = () => {
  const [gamesList, setGamesList] = useState([])
  const nav = useNavigate()

  const listGames = async () => {
    try {
      const test = []
      const { data } = await axios.get('/getgames')
      Object.keys(data).forEach(key => {
        test.push(data[key])
      })
      setGamesList(test)
    } catch (err) {
      next(Error('ERROR getting GAMES'))
    }
  }

  return (
    <>
      <h1 align="center"> Popular Games on Steam </h1>
      <Link to="/">Back to profile</Link>
      <br />
      <button
        type="button"
        className="btn mx-1 btn-primary"
        onClick={() => listGames()}
      >
        {' '}
        List Games!{' '}
      </button>
      {gamesList.map(n => (
        <div key={n.appid}>
          <h2> Game: {n.name} </h2>
          <h3> Developer: {n.developer} </h3>
          <h4> Likes: {n.positive} </h4>
          <h4> Dislikes: {n.negative} </h4>
        </div>
      ))}
    </>
  )
}

export default GetGames
