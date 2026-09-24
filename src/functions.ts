import type { PlayingCardType, PokerHandType } from "./types";

/**
 * @description Sorts the values of the player's hand and checks for each possible poker hand
 * @param hand as the player's current five cards
 */
export const getRank = (hand: PlayingCardType[]): PokerHandType => {
  let playersHand = "";
  const handValues: number[] = [];
  // Sort hand
  hand.forEach((card) => {
    handValues.push(card.value);
  });

  handValues.sort(
    (a, b) =>
      handValues.filter((card) => card === b).length -
        handValues.filter((card) => card === a).length || b - a,
  );
  // Is flush?
  if (hand.every((card) => card.symbol === hand[0].symbol)) {
    playersHand = "flush";
    // Is straight flush?
    if (handValues[0] - handValues[4] === 4) playersHand = "straightFlush";
    // Is royal flush?
    else if (
      handValues[0] === 13 &&
      handValues[3] === 10 &&
      handValues[4] === 1
    )
      playersHand = "royalFlush";
  } else {
    // Is pairs?
    const pair1: number[] = [];
    const pair2: number[] = [];

    handValues.forEach((value) => {
      if (!pair1.length || pair1[0] === value) pair1.push(value);
      else if (!pair2.length || pair2[0] === value) pair2.push(value);
    });

    if (pair1.length === 4) playersHand = "fourOfAKind";
    else if (pair1.length === 3 && pair2.length === 2)
      playersHand = "fullHouse";
    else if (pair1.length === 3) playersHand = "threeOfAKind";
    else if (pair2.length === 2) playersHand = "twoPairs";
    else if (pair1.length === 2) playersHand = "onePair";
    // Is straight?
    else if (handValues[0] - handValues[4] === 4) playersHand = "straight";
    else if (
      handValues[0] === 13 &&
      handValues[3] === 10 &&
      handValues[4] === 1
    )
      playersHand = "straight";
  }
  return playersHand as PokerHandType;
};

/**
 * @description Gets the payout associated with the player's hand rank
 * @param rank as the player's hand rank
 * @returns number
 */
export const getPayout = (rank: PokerHandType): number => {
  const PokerHand: Record<PokerHandType, number> = {
    royalFlush: 250,
    straightFlush: 50,
    fourOfAKind: 25,
    fullHouse: 9,
    flush: 6,
    straight: 4,
    threeOfAKind: 3,
    twoPairs: 2,
    onePair: 1,
  };

  return PokerHand[rank as PokerHandType];
};
