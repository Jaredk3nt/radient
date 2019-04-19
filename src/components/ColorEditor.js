import React, { useState } from "react";
import styled from "@emotion/styled";
// Components
import ColorPicker from "./ColorPicker";
import Feather from "feathered";
// Utils
import { parseRGB, stringifyRGB } from "../utils/stringifiers";

export default function ColorEditor({
  color,
  onColorUpdate,
  onWidthUpdate,
  onRemove,
  id
}) {
  return (
    <Editor>
      <ColorPalette color={color} onColorUpdate={onColorUpdate} id={id} />
      <input value={color.width} type="number" onChange={onWidthUpdate} />
      <RemoveButton onClick={onRemove}>
        <Feather icon="x" color="#aaa" />
      </RemoveButton>
    </Editor>
  );
}

export function ColorPalette({ color, onColorUpdate, id }) {
  const [open, updateOpen] = useState(false);

  function close(e) {
    if (!e.target.closest(`#${id}`)) {
      updateOpen(false);
      window.removeEventListener("click", close);
    }
  }

  function toggleOpen() {
    if (!open) {
      updateOpen(true);
      setTimeout(() => window.addEventListener("click", close), 100);
    }
  }

  function removeAlpha(color) {
    const rgba = parseRGB(color);
    delete rgba.a;
    return stringifyRGB(rgba);
  }

  return (
    <span>
      <Display
        w="40px"
        h="30px"
        bg={removeAlpha(color.color)}
        onClick={toggleOpen}
      />
      {open && (
        <ColorPicker id={id} color={color.color} onChange={onColorUpdate} />
      )}
    </span>
  );
}

const Editor = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5em 0em;
`;

const Display = styled("div")`
  width: ${p => p.w || "20px"};
  height: ${p => p.h || "20px"};
  background-color: ${p => p.bg || "#000"};
  border-radius: 4px;
  border: 1px solid #555;
`;

const RemoveButton = styled("button")`
  border: none;
  background-color: transparent;
  border-radius: 4px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    cursor: pointer;
    background-color: #eee;
  }
`;
