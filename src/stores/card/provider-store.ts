import { createStore } from "zustand/vanilla";

export interface CounterState {
  count: number;
}

export interface CounterActions {
  decrementCount: () => void;
  incrementCount: () => void;
}

export type CardStylesStore = CounterState & CounterActions;

export const defaultInitState: CounterState = {
  count: 0,
};

export const createCardStylesStore = (initState: CounterState = defaultInitState) => {
  return createStore<CardStylesStore>()(set => ({
    ...initState,
    decrementCount: () => set(state => ({ count: state.count - 1 })),
    incrementCount: () => set(state => ({ count: state.count + 1 })),
  }));
};
