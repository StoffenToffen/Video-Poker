import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getPayout, getRank } from "../functions";
import type { PlayingCardType, PokerHandType } from "../types";

interface PlayerType {
  deck: PlayingCardType[];
  hand: PlayingCardType[];
  bet: number;
  selectedCards: PlayingCardType[];
  rank: string;
  message: string;
  name: string;
  balance: number;
  discards: PlayingCardType[];
}

interface GameStore {
  currentPlayer: PlayerType;
  players: PlayerType[];

  startGame: (newDeck: PlayingCardType[]) => void;
  endGame: () => void;
  setBet: (number: number) => void;
  setSelectedCards: (card: PlayingCardType) => void;
  setMessage: (newMessage: string) => void;
  signIn: (newPlayer: PlayerType) => void;
  register: (name: string) => void;
  signOut: () => void;
  updateBalance: (change: number) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      currentPlayer: {
        deck: [],
        hand: [],
        bet: 1,
        selectedCards: [],
        rank: "",
        message: "",
        name: "",
        balance: 0,
        discards: [],
      },
      players: [],

      /**
       * @description Sets five cards to the hand and the rest to the deck, then gets the new hand's rank and resets selectedCards and discards
       * @param newDeck as a 52 card deck using PlayingCardType
       * @returns currentPlayer's hand, deck, rank, selectedCards, and discards
       */
      startGame: (newDeck) =>
        set((state) => {
          const hand = newDeck.splice(-5);
          const deck = newDeck;
          const rank = getRank(hand);
          return {
            currentPlayer: {
              ...state.currentPlayer,
              hand,
              deck,
              rank,
              selectedCards: [],
              discards: [],
            },
          };
        }),

      /**
       * @description Removes unselected cards from hand and adds up to five back from deck, then gets the new hand's rank and updates message
       * @returns currentPlayer's hand, deck, rank, message, balance, and discards
       */
      endGame: () =>
        set((state) => {
          const discards = state.currentPlayer.hand.filter(
            (card) =>
              !state.currentPlayer.selectedCards.some(
                (selectedCard) => selectedCard.id === card.id,
              ),
          );
          const hand = state.currentPlayer.hand.filter((card) =>
            state.currentPlayer.selectedCards.some(
              (selectedCard) => selectedCard.id === card.id,
            ),
          );
          const deck = [...state.currentPlayer.deck];

          while (hand.length < 5) {
            hand.push(deck.pop()!);
          }

          const rank = getRank(hand);
          let message = "";
          let balance = state.currentPlayer.balance;

          if (rank) {
            const payout = getPayout(rank as PokerHandType);

            balance += payout * state.currentPlayer.bet;
            message = `You won $${payout * state.currentPlayer.bet}`;
          } else message = "Game over";

          return {
            currentPlayer: {
              ...state.currentPlayer,
              hand,
              deck,
              rank,
              message,
              balance,
              discards,
            },
          };
        }),

      /**
       * @param number as the amount to change bet by
       * @returns currentPlayer's bet
       */
      setBet: (number) =>
        set((state) => ({
          currentPlayer: {
            ...state.currentPlayer,
            bet: state.currentPlayer.bet + number,
          },
        })),

      /**
       * @description Adds or removes a card from hand to selectedCards
       * @param card as the clicked card in hand
       * @returns currentPlayer's selectedCards
       */
      setSelectedCards: (card) =>
        set((state) => ({
          currentPlayer: {
            ...state.currentPlayer,
            selectedCards: state.currentPlayer.selectedCards.some(
              (selectedCard) => selectedCard.id === card.id,
            )
              ? state.currentPlayer.selectedCards.filter(
                  (selectedCard) => selectedCard.id !== card.id,
                )
              : [...state.currentPlayer.selectedCards, card],
          },
        })),

      /**
       * @param newMessage as the text to show
       * @returns currentPayer's message
       */
      setMessage: (newMessage) =>
        set((state) => ({
          currentPlayer: { ...state.currentPlayer, message: newMessage },
        })),

      /**
       * @param newPlayer as the new user to sign in
       * @returns currentPlayer
       */
      signIn: (newPlayer) =>
        set(() => ({
          currentPlayer: newPlayer,
        })),

      /**
       * @param newPlayer as the new player to add
       * @returns players and currentPlayer
       */
      register: (newName) =>
        set((state) => {
          const newPlayer = {
            deck: [],
            hand: [],
            bet: 1,
            selectedCards: [],
            rank: "",
            message: "",
            name: newName,
            balance: 100,
            discards: [],
          };

          return {
            players: [...state.players, newPlayer],
            currentPlayer: newPlayer,
          };
        }),

      /**
       * @description saves the player's information, and signs them out
       * @param playerLeaving as the player signing out
       * @returns players and currentPlayer
       */
      signOut: () =>
        set((state) => {
          const newPlayers = state.players.filter(
            (player) => player.name !== state.currentPlayer.name,
          );

          return {
            players: [...newPlayers, state.currentPlayer],
            currentPlayer: {
              deck: [],
              hand: [],
              bet: 1,
              selectedCards: [],
              rank: "",
              message: "",
              name: "",
              balance: 0,
              discards: [],
            },
          };
        }),

      /**
       * @description Updates the player's balance
       * @param change as the amount to change the balance by
       * @returns currentPlayer's balance
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
