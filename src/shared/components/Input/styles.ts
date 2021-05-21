import styled, { css } from 'styled-components';

export const StyledInput = styled.div`
  position: relative;
`;

export const InputElement = styled.input<Record<string, any>>`
  height: 40px;
  width: 100%;
  padding: 0 7px;
  border-radius: 3px;
  border: 1px solid #dfe1e6;
  color: #172b4d;
  transition: background 0.1s;
  font-size: 15px;
  outline: none;
  ${(props) => props.hasIcon && 'padding-left: 32px;'}
  &:hover {
    background: #ebecf0;
  }
  &:focus {
    background: #fff;
    border: 1px solid #4c9aff;
    box-shadow: 0 0 0 1px #4c9aff;
  }
  ${(props) =>
    props.invalid &&
    css`
      &,
      &:focus {
        border: 1px solid #e13c3c;
        box-shadow: none;
      }
    `}
`;
