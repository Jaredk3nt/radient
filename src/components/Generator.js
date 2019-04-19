import React, { useReducer } from "react";
import styled from "@emotion/styled";
// Components
import Artboard from "./Artboard";
import GradientEditor from "./GradientEditor";
import { ColorPalette } from "./ColorEditor";
// Utils
import { getCoordFromClick } from "../utils/grid";
import { updateList, removeFromList } from "../utils/reduce";
import { stringifyRGB, generateCSS } from "../utils/stringifiers";
// Variables
import { DEFAULT_GRADIENT_COLORS, INITIAL_GRADIENTS } from "../config/values";
const DEFAULT_COLOR = "rgba(53,137,127,0.64)";
const initialState = {
  background: "rgb(255,255,255)",
  gradients: [...INITIAL_GRADIENTS]
};
const actions = {
  ADD_GRADIENT: function(state, { gradient }) {
    return {
      ...state,
      gradients: [gradient, ...state.gradients]
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
  },
  UPDATE_BACKGROUND_COLOR: function(state, color) {
    return {
      ...state,
      background: color
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
    <Layout style={{ flexDirection: "column" }}>
      <Layout>
        <Artboard
          background={store.background}
          gradients={store.gradients}
          onClick={handleClick}
        />
        <Editors>
          <EditorList
            as="div"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Title style={{ margin: 0 }}>Background color:</Title>
            <ColorPalette
              id="background-color-editor"
              color={{ color: store.background }}
              onColorUpdate={color => {
                return send(
                  actions.UPDATE_BACKGROUND_COLOR,
                  stringifyRGB(color.rgb)
                );
              }}
            />
          </EditorList>
          <EditorList>
            {store.gradients.map((gradient, index) => (
              <React.Fragment key={`gradient-editor-${index}`}>
                <Title>Gradient {index}</Title>
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
              </React.Fragment>
            ))}
          </EditorList>
        </Editors>
      </Layout>
      <Layout style={{ marginTop: "1em" }}>
        <TextArea style={{ marginRight: "1em" }}>{`
<div className='background-container'>
  <div className='gradient'>
    // ...
  </div>
</div>
        `}</TextArea>
        <TextArea>
          {generateCSS(store.gradients, store.background)}
        </TextArea>
      </Layout>
    </Layout>
  );
}

const Layout = styled("div")`
  width: 100%;
  display: flex;
`;

const Editors = styled("div")`
  height: 500px;
  width: 300px;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 8px;
`;

const EditorList = styled("ul")`
  background-color: #14161c;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 1em;
  margin: 0em 0em 0em 1em;
  overflow: scroll;
  list-style: none;
`;

const Title = styled("p")`
  margin: 0em 0em 0.25em 0em;
  color: white;
  font-family: Work Sans, sans-serif;
`;

const TextArea = styled("textarea")`
  width: 100%;
  background-color: #14161c;
  color: white;
  border: none;
  border-radius: 8px;
  resize: none;
  box-sizing: border-box;
  min-height: 200px;
  padding: 1em;
`;
