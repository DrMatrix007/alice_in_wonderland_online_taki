import { useEffect, useState } from "react";
import { Game } from "../models/Game";

export default function useGame(ws: WebSocket | null) {
    const [game, setgame] = useState<Game | null>(null)
    const [id, setid] = useState("")
    const [error, setError] = useState('');
    const playCard = (index:number)=>{


        if(!ws) return;

        ws.send(JSON.stringify({
            type:"playCard",
            index
        }));
    }
    const createGame = () => {
        if (!ws) return;
    
        ws.send(JSON.stringify({
          type: "createGame"
        }))
      }
      const joinGame = (inputid:string) => {
        if (!ws) return;
    
        ws.send(JSON.stringify({
          type: "joinGame",
          gameId: inputid
        }));
      }

    useEffect(() => {
        if (ws) {
            ws.onopen = () => {
                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.type == 'gameState') {
                        console.log(data.game as Game)
                        setgame((data.game as Game))
                        setError('');

                    }
                    else if(data.type === 'id'){
                        setid(data.id)
                    }
                    else if(data.type === 'error') {
                        setError(data.error);
                    }
                }
            }
        }
    }, [ws])
    return [game,id,error, playCard, createGame, joinGame] as [Game,string,string ,(index:number)=>void, ()=>void, (inputid:string)=>void]
}
