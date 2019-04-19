import React from 'react';
import styled from '@emotion/styled';
// Components
import ColorEditor from './ColorEditor';
// Utils
import { stringifyRGB } from '../utils/stringifiers';

export default function GradientEditor({
  index,
  gradient,
  onColorUpdate,
  onWidthUpdate,
  onColorAdd,
  onColorRemove,
  onDelete
}) {
  return (
    <Editor>
      {gradient.colors.map((color, cIndex) => (
        <ColorEditor
          key={`color${index}-${cIndex}`}
          id={`color${index}-${cIndex}`}
          color={color}
          onColorUpdate={color => onColorUpdate(cIndex, stringifyRGB(color.rgb))}
          onWidthUpdate={e => onWidthUpdate(cIndex, e.target.value)}
          onRemove={() => onColorRemove(cIndex)}
        />
      ))}
      <button onClick={onColorAdd}>Add Color Stop</button>
      <button onClick={onDelete}>Delete</button>
    </Editor>
  );
}


const Editor = styled('li')`
  margin: .5em 0em 1em;
`;