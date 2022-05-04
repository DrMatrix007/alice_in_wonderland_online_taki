import { WebSocket } from "ws";
import { Card } from "./Card";

export class Player {
    cards: Card[];
    ws: WebSocket;
    name: string;

    constructor(ws: WebSocket, cards: Card[] = [],name:string) {
        this.cards = cards;
        this.ws = ws;
        this.name = name;
    }
}