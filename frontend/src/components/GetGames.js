import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const GetGames = () => {
  const [gamesList, setGamesList] = useState([])
  const [showGames, setShowGames] = useState(false)

  const listGames = async () => {
    try {
      const test = []
      const { data } = await axios.get('/getgames')
      Object.keys(data).forEach(key => {
        test.push(data[key])
      })
      setGamesList(test)
    } catch (err) {
      window.alert('Error: listing games')
    }
  }

  const sortLikes = () => {
    const arr = gamesList
    arr.sort((g1, g2) => Number(g2.positive) - Number(g1.positive))
    const newArr = []
    arr.forEach(e => newArr.push(e))
    setGamesList(newArr)
  }

  const sortPlayTimeGood = () => {
    const arr = gamesList
    arr.sort(
      (g1, g2) => Number(g2.average_2weeks) - Number(g1.average_2weeks),
    )
    const newArr = []
    arr.forEach(e => newArr.push(e))
    setGamesList(newArr)
  }

  return (
    <>
      <h1 align="center"> Popular Games on Steam </h1>
      <Link to="/">Back to profile</Link>
      <br />
      <button
        type="button"
        className="btn mx-1 btn-primary"
        onClick={() => {
          listGames()
          setShowGames(!showGames)
        }}
      >
        List Games!
      </button>
      <button
        type="button"
        className="btn mx-1 btn-primary"
        onClick={() => sortLikes()}
      >
        Sort by Likes!
      </button>
      <button
        type="button"
        className="btn mx-1 btn-primary"
        onClick={() => sortPlayTimeGood()}
      >
        Sort by Playtime!
      </button>
      {showGames && (
        gamesList.map(n => (
          <div key={n.appid}>
            <hr />
            <h2>{n.name}</h2>
            <p>
              Check out
              {' '}
              <a href={`https://steamdb.info/app/${n.appid}`} target="_">
                {n.name}
              </a>
              !
              <br />
              <a href={`https://steamdb.info/app/${n.appid}/screenshots`} target="_">
                Pictures
              </a>
              <br />
              <a href={`http://www.google.com.pk/search?btnG=1&pws=0&q=${n.name}`} target="_">
                More information
              </a>
            </p>
            <h5>
              Developer:
              {' '}
              {n.developer}
            </h5>
            <h5>
              Average playtime in the last 2 weeks:
              {' '}
              {n.average_2weeks}
              {' '}
              hours
            </h5>
            <h5 style={{ color: 'green' }}>
              Likes:
              {' '}
              {n.positive}
            </h5>
            <h5 style={{ color: 'red' }}>
              Dislikes:
              {' '}
              {n.negative}
            </h5>
          </div>
        )))}
    </>
  )
}

export default GetGames
