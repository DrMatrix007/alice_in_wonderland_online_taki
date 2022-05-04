import { v4 } from "uuid";
import { WebSocket } from "ws";
import Game from "./Game";

export class GameManager {
    playCard(ws:WebSocket, index: number) {
        const gameId = this.websocketsMap.get(ws);
        if(gameId) {
            const game = this.games.get(gameId);
            if(game) {
                game.playCard(ws,index);
            }
        }
    }
    games: Map<string, Game> = new Map();
    websocketsMap: Map<WebSocket, string> = new Map();

    addGame(ws: WebSocket) {
        const game = new Game(ws);

        const uuid = v4();
        this.games.set(uuid, game);
        this.setAndSendID(ws,uuid);
        return uuid;
    }
    joinGame(ws: WebSocket, gameId: string) {
        const game = this.games.get(gameId);

        if (!game) {
            return;
        }
        this.setAndSendID(ws,gameId);
        game.addPlayer(ws);

    }
    exitGame(ws:WebSocket) {
        const gameId = this.websocketsMap.get(ws);
        if(gameId) {
            const game = this.games.get(gameId);
            if(game) {
                game.removePlayer(ws);
                if(game.players.length === 0) {
                    this.games.delete(gameId);
                }
            }
        }
    }

    setAndSendID(ws: WebSocket,id:string) {
        this.websocketsMap.set(ws,id);
        ws.send(JSON.stringify({
            type: 'id',
            id: id
        }));
    }
}