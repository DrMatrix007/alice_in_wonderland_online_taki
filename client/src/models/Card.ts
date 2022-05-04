export enum Colors {
    red = 'red',
    blue = 'blue',
    green = 'green',
    yellow = 'yellow',
}

export class Card {

    color: Colors;
    value: number = -1;

    constructor(color: Colors, value: number) {
        this.color = color;
        this.value = value;
    }
}

export function getURL(card: Card) {
    return `images/${card.value}-${card.color}.png`;
}