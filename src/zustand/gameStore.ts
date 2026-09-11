import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlayingCardType } from "../types";

interface GameStore {
  deck: PlayingCardType[];
  hand: PlayingCardType[];
  discards: PlayingCardType[];
  player: {
    name: string;
    balance: number;
  };

  setDeck: (newDeck: PlayingCardType[]) => void;
  setDiscards: (cards: PlayingCardType[]) => void;
  setPlayer: (playerInfo: { name: string; balance: number }) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      deck: [],
      hand: [],
      discards: [],
      player: {
        name: "Joe",
        balance: 100,
      },

      setDeck: (newDeck) =>
        set(() => ({ hand: newDeck.splice(-5), deck: newDeck })),
      setDiscards: (cards) => set(() => ({ discards: cards })),
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
