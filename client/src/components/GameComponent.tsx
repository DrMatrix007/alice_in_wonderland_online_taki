import React from 'react'
import { Card, getURL } from '../models/Card'
import { Game } from '../models/Game'

export default function GameComponent({ game, error, playCard }: { error: string, game: Game, playCard: (i: number) => void }) {



  return (
    <>
      {
        game.players.map((player, i) => {
          return (
            <div key={i}>
              <p>{player.name}</p>
              <div style={{ maxWidth: "40vh", display: 'flex', flexDirection: "row" }}>
                {player.cards.map(a => {
                  return <img style={{ margin: '5px', imageRendering: "pixelated" }} src='images/card.png' width={100} />
                })}
              </div>
            </div>
          )
        })
      }
      <div className='center'>
        <img src={getURL(game.currentCard)} width={100} style={{ imageRendering: "pixelated" }} />
      </div>
      <div>
        <>
          you: {game.you.name}
        </>
        <div style={{ display: 'flex', flexDirection: "row" }}>

          {game.you.cards.map((card, i) => {
            return (
              <div key={i}>
                <button onClick={() => playCard(i)}><img src={getURL(card)} width={100} style={{ imageRendering: "pixelated" }} /></button>
              </div>
            )
          })}
        </div>
        <p style={{ color: 'red' }}>{error}</p>
      </div>

    </>
  )
}
