/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";

const width = 500;
const height = 400;

function stringifyGradient(g) {
  return `radial-gradient(circle at ${(g.location.x / width) * 100}% ${(g.location.y /
    height) * 100}%, ${g.colors
    .map(color => `${color.color} ${color.width}%`)
    .join(",")})`;
}

export default function Artboard({ background, gradients, onClick }) {
  return (
    <div
      onClick={onClick}
      css={css`
        width: ${width}px;
        height: ${height}px;
        background-color: ${background};
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 100%;
          background: ${gradients.map(stringifyGradient).join(",")};
        `}
      />
    </div>
  );
}
