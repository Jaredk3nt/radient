import React, { useReducer } from 'react';
import styled from '@emotion/styled';
// Components
import Button from '../Button';
import ColorEditor from '../ColorEditor';
import { ColorPalette } from '../ColorEditor';
// State
import { actions } from '../../reducer';
// Utils
import { stringifyRGB } from '../../utils/stringifiers';

export default function Sidebar({ store, send }) {
  return (
    <Layout>
      <Header />
      <Item>
        <ItemText>Background Color</ItemText>
        <ColorPalette
          rightAlign
          id="background-color-editor"
          color={{ color: store.background }}
          onColorUpdate={color => {
            return send(
              actions.UPDATE_BACKGROUND_COLOR,
              stringifyRGB(color.rgb)
            );
          }}
        />
      </Item>
      <Item column>
        <ItemText>Gradients</ItemText>
        <ItemText sub>Click on the cavas to add a new gradient</ItemText>
      </Item>
      {store.gradients.map((gradient, index) => (
        <GradientItem key={`gradient-editor-${index}`}>
          <div>
            <ItemText> Gradient {index} </ItemText>
          </div>
          <div>
            {gradient.colors.map((color, cIndex) => (
              <ColorEditor
                key={`color${index}-${cIndex}`}
                id={`color${index}-${cIndex}`}
                color={color}
                onColorUpdate={color =>
                  send(actions.UPDATE_COLOR, {
                    index,
                    cIndex,
                    color: stringifyRGB(color.rgb),
                  })
                }
                onWidthUpdate={e =>
                  send(actions.UPDATE_WIDTH, {
                    index,
                    cIndex,
                    width: e.target.value,
                  })
                }
                onRemove={() => send(actions.REMOVE_COLOR, { index, cIndex })}
              />
            ))}
            <ButtonItem>
              <Button onClick={() => send(actions.ADD_COLOR, { index })}>
                Add Color Stop
              </Button>
              <Button onClick={() => send(actions.DELETE_GRADIENT, { index })} bg='#821515'>
                Remove Gradient
              </Button>
            </ButtonItem>
          </div>
        </GradientItem>
      ))}
    </Layout>
  );
}

function Header() {
  return (
    <HeaderItem>
      <h1>Radient.</h1>
    </HeaderItem>
  );
}

const HeaderItem = styled('header')`
  width: 100%;
  box-sizing: border-box;
  padding: 1em;
  border-bottom: 1px solid #424754;

  h1 {
    margin: 8px 0px;
    font-size: 2rem;
  }
`;

const Layout = styled('div')`
  width: 100%;
  height: 100%;
  background-color: #262930;
  overflow: scroll;
`;

const Item = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: ${p => (p.column ? 'column' : 'row')};
  align-items: ${p => (p.column ? 'flex-start' : 'center')};
  justify-content: space-between;
  padding: 1em;
`;

const ItemText = styled('p')`
  margin: 0em 0em 0.2em 0em;
  color: ${p => (p.sub ? '#A4A4A4' : 'white')};
  font-weight: ${p => (p.sub ? 400 : 600)};
  font-size: ${p => (p.sub ? '.8rem' : '.9rem')};
`;

const GradientItem = styled('div')`
  box-sizing: border-box;
  background-color: #14161a;
  width: 100%;
  padding: 1em;
  border-bottom: 1px solid #262930;
`;

const ButtonItem = styled('div')`
box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
padding-top: .25em;
`;
