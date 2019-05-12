import React, { useReducer } from 'react';
import styled from '@emotion/styled';
// Components
import Artboard from '../Artboard';
import Sidebar from '../Sidebar';
// Utils
import { getCoordFromClick } from '../../utils/grid';
import {  generateCSS } from '../../utils/stringifiers';
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

  const css = generateCSS(store.gradients, store.background);

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
        <TextArea style={{ borderRight: '1px solid #262930'}} value={css}/>
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
