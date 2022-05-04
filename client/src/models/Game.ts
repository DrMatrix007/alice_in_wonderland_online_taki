import { Card } from "./Card";
import { Player } from "./Player";

export class Game {
    players: Player[];

    currentPlayer: number;

    index: number;

    you: Player;
    currentCard: Card;

    constructor(players: Player[],currentCard: Card, you: Player, currentPlayer: number, index: number) {
        this.players = players;
        this.currentPlayer = currentPlayer;
        this.index = index;
        this.you = you;
        this.currentCard = currentCard;
    }

}