import { WebSocket } from "ws";
import { Card, Colors, generateCards } from "./Card";
import { Player } from "./Player"

// game class that manages ws and game logic
export default class Game {
    players: Player[]

    cards: Card[] = generateCards({ min: 1, max: 5 }).sort(() => Math.random() - 0.5);

    currentCard: Card;

    currentPlayer = 0;

    private counter = 0;

    getNewName() {
        return `player ${this.counter++}`
    }

    takeFromCards(count: number) {
        const ans: Card[] = []

        for (let index = 0; index < count; index++) {
            ans.push(this.cards.pop() as Card);
        }
        return ans;
    }

    constructor(creatorws: WebSocket) {
        this.players = [new Player(creatorws, this.takeFromCards(8), this.getNewName())]
        this.currentCard = new Card(Colors.red, 1);

        this.updateGameState();
    }

    addPlayer(ws: WebSocket) {
        this.players.push(new Player(ws, this.takeFromCards(8), this.getNewName()));
        this.updateGameState();
    }


    updateGameState() {
        for (let index = 0; index < this.players.length; index++) {
            const element = this.players[index];
            const dataPlayers = this.players.map(a => { return { cards: a.cards, name: a.name } });
            dataPlayers.splice(index, 1);
            element.ws.send(JSON.stringify({
                type: 'gameState',
                game: {
                    currentCard: this.currentCard,
                    players: dataPlayers,
                    currentPlayer: this.currentPlayer,
                    you: {
                        cards: this.players[index].cards,
                        name: this.players[index].name
                    }
                }
            }));
        }
    }
    playCard(ws: WebSocket, card: number) {
        const player = this.players.find(a => a.ws === ws);
        if (!player) return;
        const playerIndex = this.players.indexOf(player!);

        if (playerIndex == this.currentPlayer) {
            if(player.cards[card].isOkWith(this.currentCard)) {

            this.cards.push(this.currentCard);
            this.currentCard = player.cards[card];
            player.cards.splice(card, 1);
            this.currentPlayer = (playerIndex + 1) % this.players.length;
            this.updateGameState();
            }else {
                sendError(ws, 'You can not play this card!');
            }
        } else {
            sendError(ws, 'It is not your turn!');
        }

    }

    removePlayer(ws: WebSocket) {
        const player = this.players.find(a => a.ws === ws);

        if (player) {
            this.players.splice(this.players.indexOf(player), 1);
            this.updateGameState();
        }

    }

}
function sendError(ws: WebSocket, error: string) {
    ws.send(JSON.stringify({
        type: 'error',
        error
    }))
}