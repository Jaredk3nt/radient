/** @jsx jsx */
import { useState } from 'react';
import { css, jsx } from "@emotion/core";
// Components
import Selector from './Selector';

const length = 500;

const styles = `
width: ${length}px;
height: ${length}px;
border-radius: 8px;
`;

function stringifyGradient(g) {
  return `radial-gradient(
    circle at ${(g.location.x / length) * 100}% ${(g.location.y / length) * 100}%,
    ${g.colors.map(color => `${color.color} ${color.width}%`).join(",")}
  )`;
}

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
