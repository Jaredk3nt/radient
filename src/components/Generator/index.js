import React, { useReducer } from 'react';
import styled from '@emotion/styled';
// Components
import Artboard from '../Artboard';
import Sidebar from '../Sidebar';
import GradientEditor from '../GradientEditor';
import { ColorPalette } from '../ColorEditor';
// Utils
import { getCoordFromClick } from '../../utils/grid';
import { stringifyRGB, generateCSS } from '../../utils/stringifiers';
import { reducer, initialState, actions } from '../../reducer';
// Variables
import { DEFAULT_GRADIENT_COLORS } from '../../config/values';

export default function Generator() {
  const [store, dispatch] = useReducer(reducer, initialState);
  const send = (action, args) => dispatch({ reduce: action, args });

  function handleClick(e) {
    const location = getCoordFromClick(e);
    send(actions.ADD_GRADIENT, {
      gradient: { location, colors: [...DEFAULT_GRADIENT_COLORS] },
    });
  }

  return (
    <PageLayout>
      <Layout dir='column'>
        <Layout align="center" justify="center">
          <Artboard
            background={store.background}
            gradients={store.gradients}
            onClick={handleClick}
          />
        </Layout>
        <TextArea style={{ borderRight: '1px solid #262930'}}>{generateCSS(store.gradients, store.background)}</TextArea>
      </Layout>

      <Sidebar send={send} store={store} />
    </PageLayout>
  );
}

const PageLayout = styled('main')`
  display: grid;
  grid-template-columns: 1fr 300px;
  width: 100%;
  height: 100%;
`;

const Layout = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${p => p.dir || 'row'};
  justify-content: ${p => p.justify || 'start'};
  align-items: ${p => p.align || 'start'};
`;

const Editors = styled('div')`
  height: 100%;
  width: 300px;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 8px;
`;

const EditorList = styled('ul')`
  background-color: #14161c;
  box-sizing: border-box;
  padding: 1em;
  margin: 0em 0em 0em 1em;
  overflow: scroll;
  list-style: none;
`;

const Title = styled('p')`
  margin: 0em 0em 0.25em 0em;
  color: white;
  font-family: Rubik, sans-serif;
`;

const TextArea = styled('textarea')`
  width: 100%;
  background-color: #14161c;
  color: white;
  border: none;
  resize: none;
  box-sizing: border-box;
  min-height: 200px;
  padding: 1em;
`;
