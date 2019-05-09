/** @jsx jsx */
import { useState } from 'react';
import { css, jsx } from "@emotion/core";
// Components
import Selector from './Selector';
// Utils
import { stringifyGradient } from '../utils/stringifiers';
// Variables
import { ARTBOARD_WIDTH, ARTBOARD_HEIGHT } from '../config/values';
const styles = `
width: ${ARTBOARD_WIDTH}px;
height: ${ARTBOARD_HEIGHT}px;
`;



export default function Artboard({ background, gradients, onClick }) {
  const [hovering, updateHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => updateHover(true)}
      onMouseLeave={() => updateHover(false)}
      css={css`
        ${styles}
        position: relative;
        background-color: ${background};
      `}
    >
      <div
        css={css`
          ${styles}
          background: ${gradients.map(stringifyGradient).join(",")};
        `}
      />
      {hovering && gradients.map((gradient, i) => {
        return (
          <Selector
            key={`gradient-selector-${i}`}
            location={gradient.location}
            gradient_name={`Gradient ${i}`}
          />
        );
      })}
    </div>
  );
}
