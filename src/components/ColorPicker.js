import React from 'react';
import styled from '@emotion/styled';
import { CustomPicker } from 'react-color';
import {
  Saturation,
  Hue,
  EditableInput,
  Alpha,
} from 'react-color/lib/components/common';
import { stringifyRGB } from '../utils/stringifiers';

function textColor(rgb) {
  const sum = rgb.r + rgb.g + rgb.b;
  return sum > 425 ? 'black' : 'white';
}

function ColorPicker({ rightAlign, ...props }) {
  let style = {};
  if (rightAlign) style.right = '0px';
  return (
    <Container id={props.id} style={style}>
      <p>Color Picker</p>
      <Field>
        <Saturation {...props} />
      </Field>
      <Slider>
        <Hue {...props} />
      </Slider>
      <Slider>
        <Alpha {...props} />
      </Slider>
      <EditableInput
        style={{
          input: {
            width: '100%',
            boxSizing: 'border-box',
            border: 'none',
            borderRadius: '4px',
            padding: '.45em',
            fontWeight: '500',
            fontFamily: 'Rubik, sans-serif',
            textTransform: 'lowercase',
            backgroundColor: props.hex,
            color: textColor(props.rgb),
          },
        }}
        value={stringifyRGB(props.rgb)}
        onChange={props.onChange}
      />
    </Container>
  );
}

const Container = styled('div')`
  background-color: #0B0C0D;
  position: absolute;
  box-sizing: border-box;
  width: 200px;
  padding: 0.5em .75em .75em;
  margin-top: 0px;
  border-radius: 4px;
 
  z-index: 2;
  border: 1px solid #4F5564;

  p {
    margin: 0em 0em .75em;
    color: white;
    font-size: .7rem;
  }
`;

const Field = styled('div')`
  position: relative;
  width: 100%;
  height: 125px;
`;

const Slider = styled('div')`
  position: relative;
  width: 100%;
  height: 10px;
  margin: 5px 0px;
`;

export default CustomPicker(ColorPicker);
