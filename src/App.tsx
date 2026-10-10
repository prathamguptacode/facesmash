import { useEffect, useState } from 'react'
import './App.css'
import { api } from './api/api'

type ladiesT = {
  urlLeft: string,
  urlRight: string,
  nameLeft: string,
  nameRight: string,
  usernameLeft: string,
  usernameRight: string,
  redFlagsLeft: number,
  redFlagsRight: number,
  _idLeft: string,
  _idRight: string,
}

type resT = {
  users: {
    name: string,
    username: string,
    imageUrl: string,
    redFlags: number,
    _id: string
  }[]
}


type latestT = {
  redFlags: number,
  _id: string,
}


function App() {

  const [ladies, setLadies] = useState<ladiesT | null>(null)

  const [latest, setLatest] = useState<latestT | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<resT>("/facesmash/users")
        setLadies(
          {
            nameLeft: res.data.users[0].name,
            nameRight: res.data.users[1].name,
            usernameLeft: res.data.users[0].username,
            usernameRight: res.data.users[1].username,
            urlLeft: res.data.users[0].imageUrl,
            urlRight: res.data.users[1].imageUrl,
            redFlagsLeft: res.data.users[0].redFlags,
            redFlagsRight: res.data.users[1].redFlags,
            _idLeft: res.data.users[0]._id,
            _idRight: res.data.users[1]._id,
          }
        )
        setLatest({ _id: res.data.users[1]._id, redFlags: res.data.users[1].redFlags })
      } catch (error) {
        console.log(error)
        console.log("Something went wrong")
      }
    })()
  }, [])



  async function left() {
    try {
      const res = await api.get<resT>(`/facesmash/users?id=${latest?._id}&flag=${latest?.redFlags}&nonid=${ladies?._idRight}`)
      setLadies(prev => {
        if (!prev) return null
        return {
          nameLeft: res.data.users[0].name,
          nameRight: prev.nameRight,
          usernameLeft: res.data.users[0].username,
          usernameRight: prev.usernameRight,
          urlLeft: res.data.users[0].imageUrl,
          urlRight: prev.urlRight,
          redFlagsLeft: res.data.users[0].redFlags,
          redFlagsRight: prev.redFlagsRight,
          _idLeft: res.data.users[0]._id,
          _idRight: prev._idRight,
        }
      })
      setLatest({ _id: res.data.users[0]._id, redFlags: res.data.users[0].redFlags })
    } catch (error) {
      console.log(error)
      console.log("Something went wrong")
    }
  }
  async function right() {
    try {
      const res = await api.get<resT>(`/facesmash/users?id=${latest?._id}&flag=${latest?.redFlags}&nonid=${ladies?._idLeft}`)
      setLadies(prev => {
        if (!prev) return null
        return {
          nameLeft: prev.nameLeft,
          nameRight: res.data.users[0].name,
          usernameLeft: prev.usernameLeft,
          usernameRight: res.data.users[0].username,
          urlLeft: prev.urlLeft,
          urlRight: res.data.users[0].imageUrl,
          redFlagsLeft: prev.redFlagsLeft,
          redFlagsRight: res.data.users[0].redFlags,
          _idLeft: prev._idLeft,
          _idRight: res.data.users[0]._id,
        }
      })
      setLatest({ _id: res.data.users[0]._id, redFlags: res.data.users[0].redFlags })
    } catch (error) {
      console.log(error)
      console.log("Something went wrong")
    }
  }


  return (
    <>
      <h1 className='headBox'>FACESMASH</h1>
      <p className='pBox'>Were we let you in for your looks? No, Will be judged on them? Yes</p>
      <h2>Who is hotter? Click to choose</h2>
      {/* play area */}
      <div className='play'>
        <button className='ibx' onClick={right}>
          <img src={ladies?.urlLeft} alt='girl1' width={"300px"} height={"300px"} className='ladiesImg' />
          <div className='info'>
            <div>{ladies?.nameLeft}</div>
            <div><a href={`https://www.instagram.com/${ladies?.usernameLeft}/`} target='_blank'>{ladies?.usernameLeft}</a></div>
          </div>
        </button>
        <div>OR</div>
        <button className='ibx' onClick={left}>
          <img src={ladies?.urlRight} alt='girl2' width={"300px"} height={"300px"} className='ladiesImg' />
          <div className='info'>
            <div>{ladies?.nameRight}</div>
            <div><a href={`https://www.instagram.com/${ladies?.usernameRight}/`} target='_blank'>{ladies?.usernameRight}</a></div>
          </div>
        </button>
      </div>
      <nav>
        <div>About</div>
        <div>Submit</div>
        <div>Ranking</div>
        <div>Previous</div>
      </nav>
    </>
  )
}

export default App
