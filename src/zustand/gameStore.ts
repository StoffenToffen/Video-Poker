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
  setHand: (newDeck: PlayingCardType[]) => void;
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
        name: "",
        balance: 0,
      },

      setDeck: (newDeck) => set(() => ({ deck: newDeck })),
      setHand: (newDeck) => set(() => ({ hand: newDeck.slice(-5) })),
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
