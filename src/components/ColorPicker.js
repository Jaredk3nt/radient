import React from "react";
import styled from "@emotion/styled";
import { CustomPicker } from "react-color";
import {
  Saturation,
  Hue,
  EditableInput,
  Alpha
} from "react-color/lib/components/common";
import { stringifyRGB } from '../utils/stringifiers';

function textColor(rgb) {
  const sum = rgb.r + rgb.g + rgb.b;
  return sum > 425 ? 'black' : 'white';
}

function ColorPicker(props) {
  return (
    <Container id={props.id}>
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
              color: textColor(props.rgb)
            }
          }}
          value={stringifyRGB(props.rgb)}
          onChange={props.onChange}
        />
    </Container>
  );
}

const Container = styled("div")`
  background-color: white;
  position: absolute;
  box-sizing: border-box;
  width: 200px;
  padding: .5em;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

const Field = styled("div")`
  position: relative;
  width: 100%;
  height: 125px;
`;

const Slider = styled("div")`
  position: relative;
  width: 100%;
  height: 10px;
  margin: 5px 0px;
`;

export default CustomPicker(ColorPicker);
