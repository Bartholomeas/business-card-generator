"use client";

import { useReducer } from "react";

import { type BusinessCard } from "~/server/api/routers/user/requests";
import { type ReducerState, type ReducerActions } from "./types";

const reducer = (state: ReducerState, action: ReducerActions) => {
  switch (action.type) {
    case "add_style":
      return { ...state };
    case "update_style":
      return { ...state };
    default:
      return state;
  }
};

const initialState: ReducerState = {
  generalStyles: {},
  front: { styles: {}, textElements: [{ id: "ss", text: "" }] },
  back: { styles: {} },
};
const useCardStyles = (card: BusinessCard | undefined) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
export default useCardStyles;
