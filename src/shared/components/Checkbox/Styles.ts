import color from 'shared/styles/color';
import styled from 'styled-components';

export const CheckboxLabel = styled.label`
  display: inline-flex;
`;

export const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 5px;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const StyledCheckbox = styled.div<Record<string, any>>`
  position: relative;
  width: 12px;
  height: 12px;
  background: ${(props) => (props.checked ? color.success : '#fff')};
  border: 2px solid ${(props) => (props.checked ? color.success : '#dadada')};
  border-radius: 3px;
  transition: all 150ms;
  cursor: pointer;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px ${color.success};
  }

  ${Icon} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;
