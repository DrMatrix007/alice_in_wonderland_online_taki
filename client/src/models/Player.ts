import { Card } from "./Card";

export class Player {
    cards: Card[];

    name: string;

    constructor(cards: Card[] = [], name: string = "unknown") {
        this.cards = cards;
        this.name = name;
    }
}