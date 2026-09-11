import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlayingCardType } from "../types";

interface GameStore {
  deck: PlayingCardType[];
  hand: PlayingCardType[];
  discards: PlayingCardType[];
  bet: number;
  player: {
    name: string;
    balance: number;
  };

  setDeck: (newDeck: PlayingCardType[]) => void;
  setDiscards: (cards: PlayingCardType[]) => void;
  setBet: (number: number) => void;
  setPlayer: (playerInfo: { name: string; balance: number }) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      deck: [],
      hand: [],
      discards: [],
      bet: 0,
      player: {
        name: "Joe",
        balance: 100,
      },

      setDeck: (newDeck) =>
        set(() => ({ hand: newDeck.splice(-5), deck: newDeck })),
      setDiscards: (cards) => set(() => ({ discards: cards })),
      setBet: (number) =>
        set((state) => ({
          bet:
            state.bet + number < 0 || state.bet + number > 5
              ? state.bet
              : state.bet + number,
        })),
      setPlayer: (playerInfo) =>
        set(() => ({
          player: {
            name: playerInfo.name,
            balance: playerInfo.balance,
          },
        })),
    }),
    { name: "game" },
  ),
);
