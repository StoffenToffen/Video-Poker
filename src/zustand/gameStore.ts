import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlayingCardType } from "../types";

interface GameStore {
  deck: PlayingCardType[];
  hand: PlayingCardType[];
  bet: number;
  selectedCards: PlayingCardType[];
  isGameOver: boolean;
  player: {
    name: string;
    balance: number;
  };

  setDeck: (newDeck: PlayingCardType[]) => void;
  setHand: (selectedCards: PlayingCardType[]) => void;
  setBet: (number: number) => void;
  setSelectedCards: (card: PlayingCardType) => void;
  deselectCards: () => void;
  setIsGameOver: () => void;
  setPlayer: (playerInfo: { name: string; balance: number }) => void;
  updateBalance: (change: number) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      deck: [],
      hand: [],
      bet: 0,
      selectedCards: [],
      isGameOver: true,
      player: {
        name: "Joe",
        balance: 100,
      },

      setDeck: (newDeck) =>
        set(() => ({ hand: newDeck.splice(-5), deck: newDeck })),

      setHand: (selectedCards) =>
        set((state) => {
          const hand = [
            ...state.hand.filter((card) => selectedCards.includes(card)),
          ];
          const deck = [...state.deck];

          while (hand.length < 5) {
            hand.push(deck.pop()!);
          }
          return { hand, deck };
        }),

      setBet: (number) =>
        set((state) => ({
          bet:
            state.bet + number < 0 || state.bet + number > 5
              ? state.bet
              : state.bet + number,
        })),

      setSelectedCards: (card) =>
        set((state) => ({
          selectedCards: state.selectedCards.includes(card)
            ? state.selectedCards.filter(
                (selectedCard) => selectedCard !== card,
              )
            : [...state.selectedCards, card],
        })),

      deselectCards: () => set(() => ({ selectedCards: [] })),

      setIsGameOver: () => set((state) => ({ isGameOver: !state.isGameOver })),

      setPlayer: (playerInfo) =>
        set(() => ({
          player: {
            name: playerInfo.name,
            balance: playerInfo.balance,
          },
        })),

      updateBalance: (change) =>
        set((state) => ({
          player: {
            ...state.player,
            balance: state.player.balance + change,
          },
        })),
    }),
    { name: "game" },
  ),
);
