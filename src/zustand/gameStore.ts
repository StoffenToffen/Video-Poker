import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getPayout, getRank } from "../functions";
import type { PlayingCardType, PokerHandType } from "../types";

interface PlayerType {
  name: string;
  balance: number;
}

interface GameStore {
  deck: PlayingCardType[];
  hand: PlayingCardType[];
  bet: number;
  selectedCards: PlayingCardType[];
  rank: string;
  message: string;
  currentPlayer: PlayerType;
  players: PlayerType[];

  startGame: (newDeck: PlayingCardType[]) => void;
  endGame: (selectedCards: PlayingCardType[]) => void;
  setBet: (number: number) => void;
  setSelectedCards: (card: PlayingCardType) => void;
  deselectCards: () => void;
  setMessage: (newMessage: string) => void;
  setCurrentPlayer: (playerInfo: PlayerType) => void;
  register: (name: string) => void;
  updateBalance: (change: number) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      deck: [],
      hand: [],
      bet: 1,
      selectedCards: [],
      rank: "",
      message: "",
      currentPlayer: {
        name: "Joe",
        balance: 100,
      },
      players: [],

      /**
       * @description Sets five cards to the hand and the rest to the deck, then gets the new hand's rank
       * @param newDeck as a 52 card deck using PlayingCardType
       * @returns hand, deck and rank
       */
      startGame: (newDeck) =>
        set(() => {
          const hand = newDeck.splice(-5);
          const deck = newDeck;
          const rank = getRank(hand);
          return { hand, deck, rank };
        }),

      /**
       * @description Removes unselected cards from hand and adds up to five back from deck, then gets the new hand's rank and updates message
       * @param selectedCards as the cards selected from the hand
       * @returns hand, deck, rank, and message
       */
      endGame: (selectedCards) =>
        set((state) => {
          const hand = [
            ...state.hand.filter((card) => selectedCards.includes(card)),
          ];
          const deck = [...state.deck];

          while (hand.length < 5) {
            hand.push(deck.pop()!);
          }

          const rank = getRank(hand);
          let message = "";

          if (rank) {
            const payout = getPayout(rank as PokerHandType);

            state.updateBalance(payout * state.bet);
            message = `You won $${payout * state.bet}`;
          } else message = "Game over";

          return { hand, deck, rank, message };
        }),

      /**
       * @param number as the amount to change bet by
       * @returns bet
       */
      setBet: (number) => set((state) => ({ bet: state.bet + number })),

      /**
       * @description Adds or removes a card from hand to selectedCards
       * @param card as the clicked card in hand
       * @returns selectedCards
       */
      setSelectedCards: (card) =>
        set((state) => ({
          selectedCards: state.selectedCards.includes(card)
            ? state.selectedCards.filter(
                (selectedCard) => selectedCard !== card,
              )
            : [...state.selectedCards, card],
        })),

      /**
       * @returns selectedCards
       */
      deselectCards: () => set(() => ({ selectedCards: [] })),

      /**
       * @param newMessage as the text to show
       * @returns message
       */
      setMessage: (newMessage) => set(() => ({ message: newMessage })),

      /**
       * @param playerInfo as name and balance
       * @returns currentPlayer
       */
      setCurrentPlayer: (playerInfo) =>
        set(() => ({
          currentPlayer: {
            name: playerInfo.name,
            balance: playerInfo.balance,
          },
        })),

      /**
       * @param newPlayer as the new player to add
       * @returns players and currentPlayer
       */
      register: (newName) =>
        set((state) => ({
          players: [...state.players, { name: newName, balance: 100 }],
          currentPlayer: { name: newName, balance: 100 },
        })),

      /**
       * @description Updates the player's balance
       * @param change as the amount to change the balance by
       * @returns currentPlayer
       */
      updateBalance: (change) =>
        set((state) => ({
          currentPlayer: {
            ...state.currentPlayer,
            balance: state.currentPlayer.balance + change,
          },
        })),
    }),
    { name: "game" },
  ),
);
