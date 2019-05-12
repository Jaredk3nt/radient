import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
// Utils
import { getCoordFromClick, getBoundingSize } from '../utils/grid';

export default function Slider({ value, onChange }) {
  const [rect, setRect] = useState(0);

  const distRef = useCallback(node => {
    if (node !== null && !rect) {
      const rectObj = node.getBoundingClientRect();
      setRect(rectObj);
    }
  });

  function updateValue(x, width) {
    const pad = -15;
    let percent = ((x + pad) / (width - 30)) * 100;
    if (percent > 100) {
      percent = 100;
    }
    if (percent < 0) {
      percent = 0;
    }
    onChange(Math.round(percent));
  }

  function translateDist(width) {
    const dist = (width - 30) * (value / 100);
    return dist + 'px';
  }

  function handleContainerClick(e) {
    const { width } = getBoundingSize(e);
    const { x } = getCoordFromClick(e);
    updateValue(x, width);
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (rect) {
      updateValue(e.clientX - rect.left - 6, rect.width);
    }
  }

  function handleDragStart(e) {
    e.preventDefault();
    e.stopPropagation();
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  }

  function handleDragEnd(e) {
    e.preventDefault();
    e.stopPropagation();
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  }

  return (
    <SliderContainer onMouseDown={handleContainerClick} ref={distRef}>
      <SliderButton
        draggable="true"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        style={{ transform: `translateX(${translateDist(rect.width)})` }}
      >
        {value}%
      </SliderButton>
    </SliderContainer>
  );
}

const SliderContainer = styled('div')`
  width: 100%;
  height: 30px;
  background-color: #2b3038;
  border-radius: 4px;
  position: relative;

  &:after {
    content: ' ';
    position: absolute;
    background-color: #1f2329;
    width: calc(100% - 1em);
    top: 15px;
    height: 2px;
    left: 0.5em;
    z-index: 1;
  }
`;

const SliderButton = styled('button')`
  position: relative;
  border-radius: 50%;
  border: none;
  width: 30px;
  height: 30px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  z-index: 2;
  font-family: Rubik, sans-serif;
  font-size: 0.6rem;
`;
