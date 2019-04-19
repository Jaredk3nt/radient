import React from "react";
import styled from "@emotion/styled";

function Selector({ location, onUpdate }) {
  /*
  On the mouse down add an mouse location listener
  update the location every iteration in the listener to update the gradient position
  on down remove the listener and change loction back to the location coming from the gradient
  */
  return (
    <SelectorStyled
      location={location}
      onClick={e => e.stopPropagation()}
      onMouseDown={() => console.log("down")}
      onMouseUp={() => console.log("up")}
    />
  );
}

const SelectorStyled = styled("span")`
  position: absolute;
  top: ${p => p.location.y}px;
  left: ${p => p.location.x}px;
  background-color: white;
  border: 1px solid black;
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

export default Selector;
