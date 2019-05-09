import { updateList, removeFromList } from './utils/reduce';
import { INITIAL_GRADIENTS } from './config/values';

export const DEFAULT_COLOR = 'rgba(53,137,127,0.64)';
export const initialState = {
  background: 'rgb(255,255,255)',
  gradients: [...INITIAL_GRADIENTS],
};
export const actions = {
  ADD_GRADIENT: function(state, { gradient }) {
    return {
      ...state,
      gradients: [gradient, ...state.gradients],
    };
  },
  ADD_COLOR: function(state, { index }) {
    const g = state.gradients[index];
    const newG = {
      ...g,
      colors: [...g.colors, { color: DEFAULT_COLOR, width: 100 }],
    };
    return {
      ...state,
      gradients: updateList(state.gradients, index, newG),
    };
  },
  REMOVE_COLOR: function(state, { index, cIndex }) {
    const g = state.gradients[index];
    if (g.colors.length < 2) {
      return {
        ...state,
        gradients: removeFromList(state.gradients, index),
      };
    }
    const newG = {
      ...g,
      colors: removeFromList(g.colors, cIndex),
    };
    return {
      ...state,
      gradients: updateList(state.gradients, index, newG),
    };
  },
  UPDATE_COLOR: function(state, { index, cIndex, color }) {
    const g = state.gradients[index];
    const c = g.colors[cIndex];
    return {
      ...state,
      gradients: updateList(state.gradients, index, {
        ...g,
        colors: updateList(g.colors, cIndex, {
          ...c,
          color: color,
        }),
      }),
    };
  },
  UPDATE_WIDTH: function(state, { index, cIndex, width }) {
    const g = state.gradients[index];
    const c = g.colors[cIndex];
    return {
      ...state,
      gradients: updateList(state.gradients, index, {
        ...g,
        colors: updateList(g.colors, cIndex, {
          ...c,
          width: width,
        }),
      }),
    };
  },
  DELETE_GRADIENT: function(state, { index }) {
    return {
      ...state,
      gradients: removeFromList(state.gradients, index),
    };
  },
  UPDATE_BACKGROUND_COLOR: function(state, color) {
    return {
      ...state,
      background: color,
    };
  },
};

export function reducer(state, action) {
  if (action.reduce) return action.reduce(state, action.args);
  return state;
}
