import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import useWebSocket from './hooks/useWebSocket'
import useGame from './hooks/useGame'
import GameComponent from './components/GameComponent'

const SERVER_URL = 'ws://localhost:8080'

function App() {
  const [inputid, setinputid] = useState("")

  const ws = useWebSocket(SERVER_URL)

  const [game, id,error ,playCard, createGame, joinGame] = useGame(ws);

  useEffect(() => {
    if (window.location.hash !== "") {
      setinputid(window.location.hash.substring(1))
    }
  }, []);


  return (
    <>
      <a href={`#${id}`}>{window.location.hostname}#{id}</a>
      {
        game && ws ? <>
          <GameComponent error={error} playCard={playCard} game={game} />
        </> :
          <>
            <button onClick={createGame}>Create A game</button>
            <input value={inputid} onChange={(a) => setinputid(a.target.value)} />
            <button onClick={() => joinGame(inputid)}>Join A game</button>
          </>

      }
    </>

  )
}

export default App
