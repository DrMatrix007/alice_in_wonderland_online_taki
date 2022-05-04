export enum Colors {
    red = 'red',
    blue = 'blue',
    green = 'green',
    yellow = 'yellow',
}

export class Card {
    isOkWith(currentCard: Card) {
        return this.color === currentCard.color || this.value === currentCard.value;
    }
    color: Colors;
    value: number;

    constructor(color: Colors, value: number) {
        this.color = color;
        this.value = value;
    }           
}

export function generateCards(valueRange:{min:number,max:number}) {
    const cards: Card[] = [];

    for (let i = valueRange.min; i <= valueRange.max; i++) {
        Object.keys(Colors).forEach(element => {
            cards.push(new Card(element as Colors, i));
        });
    }
    return cards;
}