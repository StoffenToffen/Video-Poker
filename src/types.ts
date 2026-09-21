export interface PlayingCardType {
  id: number;
  symbol: string;
  value: number;
}

export type PokerHandType =
  | "royalFlush"
  | "straightFlush"
  | "fourOfAKind"
  | "fullHouse"
  | "flush"
  | "straight"
  | "threeOfAKind"
  | "twoPairs"
  | "onePair";
