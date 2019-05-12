import React, { useState } from "react";
import styled from "@emotion/styled";
// Components
import Slider from './Slider';
import Feather from "feathered";
import ColorPicker from "./ColorPicker";
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
      <Slider value={color.width} onChange={onWidthUpdate} />
      <RemoveButton onClick={onRemove}>
        <Feather icon="x" color="#aaa" />
      </RemoveButton>
    </Editor>
  );
}

export function ColorPalette({ color, onColorUpdate, id, rightAlign }) {
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
    <span style={{ position: 'relative'}}>
      <Display
        w="40px"
        h="30px"
        bg={removeAlpha(color.color)}
        onClick={toggleOpen}
      />
      {open && (
        <ColorPicker id={id} color={color.color} onChange={onColorUpdate} rightAlign={rightAlign} />
      )}
    </span>
  );
}

const Editor = styled("div")`
  display: grid;
  grid-template-columns: 40px 1fr 24px;
  grid-gap: 8px;
  margin: 0.5em 0em;
`;

const Display = styled("div")`
  width: ${p => p.w || "20px"};
  height: ${p => p.h || "20px"};
  background-color: ${p => p.bg || "#000"};
  border-radius: 4px;
  border: 1px solid #bbb;

  &:hover {
    cursor: pointer;
  }
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
