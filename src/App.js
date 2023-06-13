import { useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom'
import { useField } from './hooks'

const Menu = ({infoProp, propAnecdotes, propCreate, propAbout}) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Router>
      <div>
        <Link to={"/"}>Software anecdotes </Link>        
        <Link to={"/anecdotes"}>anecdotes </Link>
        <Link to={"create"}> create </Link>
        <Link to={"/about"}> about</Link>
      </div>
      <Routes>
        <Route path='/' element={propAnecdotes} />
        <Route path='/anecdotes' element={propAnecdotes} />
        <Route path='/create' element={propCreate}/>
        <Route path='/about' element={propAbout}/>
      </Routes>

        <div>
          {infoProp}
        </div>
      </Router>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)



const CreateNew = (props) => {
  const [noti, setNoti] = useState(false)





  // changeNotiStateToFalse
  const changeNotiStateToFalse = () => {
    setNoti(false)
  }
  useEffect(() => {

    console.log('notification!!!')
    setTimeout(changeNotiStateToFalse, 5000)
  })

  // navigating to page anecdotes
  const navigate = useNavigate()

  const handleSubmit = (e) => {

    console.log('in handleSubmits')
    console.log('this is e', e)
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      url: "...",
      votes: 0
    })
    console.log('next navigating to anecdotes')
    navigate('/anecdotes')
    setNoti(true)
  }

  // using useField custom hook
  const content = useField('content')
  const author = useField('author')
  const urlVar = useField('url')



  return (
    <div>
      <div>
      <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          content<input 
            type={content.type}
            value={content.value}
            onChange={content.onChange}
            
          />
          <button type="submit">create</button>
          <button onClick={content.reset}>
            Reset
          </button>
        </form>
      </div>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <Menu infoProp={<Footer/>} propAnecdotes={<AnecdoteList anecdotes={anecdotes}/>} propCreate={<CreateNew addNew={addNew}/>} propAbout={<About/>}/>
    </div>
  )
}

export default App
