import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const manager = new GameManager();

const wss = new WebSocketServer({ port: 8080 });




wss.on("connection", (ws) => {
    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data.toString());
        if (data.type === "createGame") {
            manager.addGame(ws);
        } else if (data.type === "joinGame") {
            manager.joinGame(ws, data.gameId);
        } else if (data.type === "playCard") {
            manager.playCard(ws, data.index);
        }
    }
    ws.onclose = (msg) => {
        manager.exitGame(ws);
    }
})



