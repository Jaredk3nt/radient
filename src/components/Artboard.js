/** @jsx jsx */
import { css, jsx } from "@emotion/core";

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
  return (
    <div
      onClick={onClick}
      css={css`
        ${styles}
        background-color: ${background};
      `}
    >
      <div
        css={css`
          ${styles}
          background: ${gradients.map(stringifyGradient).join(",")};
        `}
      />
    </div>
  );
}
