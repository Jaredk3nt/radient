/** @jsx jsx */
import React, { useState, useReducer } from "react";
import { css, jsx } from "@emotion/core";
// Components
import Artboard from "./Artboard";
// Utils
import { getCoordFromClick } from "../utils/grid";
import { updateList, removeFromList } from "../utils/reduce";
// Variables
const DEFAULT_GRADIENT_COLORS = [
  { color: "rgba(53,137,127,0.94)", width: 14 },
  { color: "rgba(49, 111, 127,0.42)", width: 45 },
  { color: "rgba(29,33,36,0.18)", width: 100 }
];
const initialState = {
  background: "#000",
  gradients: []
};
const actions = {
  ADD_GRADIENT: function(state, args) {
    return {
      ...state,
      gradients: [...state.gradients, args.gradient]
    };
  },
  UPDATE_COLOR: function(state, args) {
    const g = state.gradients[args.index];
    const c = g.colors[args.cIndex];
    return {
      ...state,
      gradients: updateList(state.gradients, args.index, {
        ...g,
        colors: updateList(g.colors, args.cIndex, {
          ...c,
          color: args.color
        })
      })
    };
  },
  UPDATE_WIDTH: function(state, args) {
    const g = state.gradients[args.index];
    const c = g.colors[args.cIndex];
    return {
      ...state,
      gradients: updateList(state.gradients, args.index, {
        ...g,
        colors: updateList(g.colors, args.cIndex, {
          ...c,
          width: args.width
        })
      })
    };
  },
  DELETE_GRADIENT: function(state, args) {
    return {
      ...state,
      gradients: removeFromList(state.gradients, args.index)
    };
  }
};

function reducer(state, action) {
  if (action.reduce) return action.reduce(state, action.args);
  return state;
}

export default function Generator() {
  const [store, dispatch] = useReducer(reducer, initialState);
  const send = (action, args) => dispatch({ reduce: action, args });

  function handleClick(e) {
    const location = getCoordFromClick(e);
    send(actions.ADD_GRADIENT, {
      gradient: { location, colors: [...DEFAULT_GRADIENT_COLORS] }
    });
  }

  return (
    <div>
      <Artboard
        background={store.background}
        gradients={store.gradients}
        onClick={handleClick}
      />
      <ul>
        {store.gradients.map((gradient, index) => (
          <li>
            {gradient.colors.map((color, cIndex) => (
              <div>
                <div
                  css={css`
                    width: 15px;
                    height: 15px;
                    background-color: ${color.color};
                  `}
                />
                <input
                  value={color.color}
                  onChange={e => {
                    send(actions.UPDATE_COLOR, {
                      index,
                      cIndex,
                      color: e.target.value
                    });
                  }}
                />
                <input
                  value={color.width}
                  type="number"
                  onChange={e => {
                    send(actions.UPDATE_WIDTH, {
                      index,
                      cIndex,
                      width: e.target.value
                    });
                  }}
                />
              </div>
            ))}
            <button
              onClick={() => {
                send(actions.DELETE_GRADIENT, { index });
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
