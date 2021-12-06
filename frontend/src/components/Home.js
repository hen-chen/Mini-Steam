import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

const Home = () => {
  const [logged, setLogged] = useState(false)
  const [username, setUsername] = useState('')
  const [newGame, setNewGame] = useState(false)
  const [gText, setGText] = useState('')
  const [users, setUsers] = useState([])
  const [currUser, setCurrUser] = useState({})

  const nav = useNavigate()

  const logout = async () => {
    try {
      const { data } = await axios.post('/account/logout', { username })
      if (data === 'user logged out') {
        nav('/account/login')
        setUsername('')
        setLogged(false)
      } else {
        window.alert('User not logged out successfully')
      }
    } catch (err) {
      window.alert('Error: logout')
    }
  }

  const loggedUser = async () => {
    try {
      const { data } = await axios.post('/account/loggedin')
      if (data !== '' && data !== undefined) {
        setUsername(data)
        setLogged(true)
      }
    } catch (err) {
      window.alert('Error: loggedUser')
    }
  }

  // ============ Games ============
  const addG = async user => {
    try {
      const { _id } = user
      const { data } = await axios.post('/api/add', { _id, game: gText })
      if (data === 'Game added') {
        setNewGame(false)
        setGText('')
      }
    } catch (err) {
      window.alert('Error: addG')
    }
  }

  const listU = async () => {
    try {
      const { data } = await axios.get('/api/users')
      setUsers(data)
    } catch (err) {
      window.alert('Error: listU')
    }
  }

  useEffect(async () => {
    loggedUser()
    listU()
    const intervalID = setInterval(() => {
      listU()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <div className="container">
      {logged && (
        <div className="page-header">
          <h1> {username}'s profile! </h1>
          <div align="right">
            <button
              type="button"
              className="btn mx-1 btn-danger"
              onClick={() => {
                logout()
                setLogged(false)
              }}
            >
              {' '}
              Logout
              {' '}
            </button>
          </div>
          <br />
          <div align="center">
            <button
              type="button"
              className="btn mx-1 btn-primary"
              onClick={() => setNewGame(true)}
            >
              {' '}
              Add Game!{' '}
            </button>
          </div>

          {newGame && (
            <div className="container">
              <h4> New Game: </h4>
              <input
                onChange={e => setGText(e.target.value)}
                placeholder="Write new game here"
              />
              <br />
              <button
                type="button"
                className="btn mx-1 btn-primary"
                onClick={() => addG(currUser)}
              >
                {' '}
                Submit Game!{' '}
              </button>
              <button
                type="button"
                className="btn mx-1 btn-danger"
                onClick={() => setNewGame(false)}
              >
                {' '}
                Cancel{' '}
              </button>
            </div>
          )}
        </div>
      )}
      {!logged && <Link to="/account/login"> Log in to view profile </Link>}
      <br />

      <h3> All Users: </h3>
      <div className="container">
        {users.map(u => (
          <div key={u._id} className="card">
            <h4> {u.username}'s Games </h4>
            {u.games.map(g => (
              // have something here that hides
              <div key={uuidv4()}>
                <p className="card-text"> {g} </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <hr />
      <Link to="/games"> View Steam Games! </Link>
    </div>
  )
}

export default Home
