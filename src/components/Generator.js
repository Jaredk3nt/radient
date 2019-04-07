import React, { useReducer } from "react";
import styled from "@emotion/styled";
// Components
import Artboard from "./Artboard";
import GradientEditor from "./GradientEditor";
// Utils
import { getCoordFromClick } from "../utils/grid";
import { updateList, removeFromList } from "../utils/reduce";
// Variables
const DEFAULT_COLOR = "rgba(53,137,127,0.64)";
const DEFAULT_GRADIENT_COLORS = [
  { color: "rgba(53,137,127,0.94)", width: 14 },
  { color: "rgba(49, 111, 127,0.42)", width: 45 },
  { color: "rgba(29,33,36,0.18)", width: 100 }
];
const initialState = {
  background: "#fff",
  gradients: [
    {
      location: {
        x: 479,
        y: 321.76666259765625
      },
      colors: [
        {
          color: "rgba(255,69,192,0.77)",
          width: "6"
        },
        {
          color: "rgba(255,3,8,0.21)",
          width: "40"
        },
        {
          color: "rgba(243,95,37,0.05)",
          width: 100
        }
      ]
    },
    {
      location: {
        x: 23,
        y: 485.76666259765625
      },
      colors: [
        {
          color: "rgba(244,255,0,0.8)",
          width: "14"
        },
        {
          color: "rgba(253,206,0,0.28)",
          width: "78"
        },
        {
          color: "rgba(255,100,0,0.29)",
          width: 100
        }
      ]
    },
    {
      location: {
        x: 33,
        y: 10.76666259765625
      },
      colors: [
        {
          color: "rgba(255,0,0,1)",
          width: "17"
        },
        {
          color: "rgba(255,0,10,0.88)",
          width: 45
        },
        {
          color: "rgba(255,0,0,0.18)",
          width: 100
        }
      ]
    }
  ]
};
const actions = {
  ADD_GRADIENT: function(state, { gradient }) {
    return {
      ...state,
      gradients: [...state.gradients, gradient]
    };
  },
  ADD_COLOR: function(state, { index }) {
    const g = state.gradients[index];
    const newG = {
      ...g,
      colors: [...g.colors, { color: DEFAULT_COLOR, width: 100 }]
    };
    return {
      ...state,
      gradients: updateList(state.gradients, index, newG)
    };
  },
  REMOVE_COLOR: function(state, { index, cIndex }) {
    const g = state.gradients[index];
    if (g.colors.length < 2) {
      return {
        ...state,
        gradients: removeFromList(state.gradients, index)
      };
    }
    const newG = {
      ...g,
      colors: removeFromList(g.colors, cIndex)
    };
    return {
      ...state,
      gradients: updateList(state.gradients, index, newG)
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
          color: color
        })
      })
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
          width: width
        })
      })
    };
  },
  DELETE_GRADIENT: function(state, { index }) {
    return {
      ...state,
      gradients: removeFromList(state.gradients, index)
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

  console.log(store);

  return (
    <Layout>
      <Artboard
        background={store.background}
        gradients={store.gradients}
        onClick={handleClick}
      />
      <EditorList>
        {store.gradients.map((gradient, index) => (
          <>
          <GradientTitle>Gradient {index}</GradientTitle>
          <GradientEditor
            index={index}
            gradient={gradient}
            onColorUpdate={(cIndex, color) =>
              send(actions.UPDATE_COLOR, { index, cIndex, color })
            }
            onWidthUpdate={(cIndex, width) =>
              send(actions.UPDATE_WIDTH, { index, cIndex, width })
            }
            onColorAdd={() => send(actions.ADD_COLOR, { index })}
            onColorRemove={cIndex =>
              send(actions.REMOVE_COLOR, { index, cIndex })
            }
            onDelete={() => send(actions.DELETE_GRADIENT, { index })}
          />
          </>
        ))}
      </EditorList>
    </Layout>
  );
}

const Layout = styled("div")`
  width: 100%;
  display: flex;
`;

const EditorList = styled("ul")`
  background-color: #14161c;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 1em;
  margin: 0em 1em;
  height: 500px;
  width: 300px;
  overflow: scroll;
  list-style: none;
`;

const GradientTitle = styled('p')`
  margin: 0em 0em .25em 0em;
  color: white;
  font-family: Work Sans, sans-serif;
`;
