import { font } from 'shared/styles/font';
import mixin from 'shared/styles/mixin';
import styled from 'styled-components';

export const Image = styled.div<Record<string, any>>`
  display: inline-block;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 100%;
  ${(props) => mixin.backgroundImage(props.avatarUrl)}
`;

export const Letter = styled.div<Record<string, any>>`
  display: inline-block;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 100%;
  text-transform: uppercase;
  color: #fff;
  background: ${(props) => props.color};
  ${font.medium}
  ${(props) => font.size(Math.round(props.size / 1.7))}
  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;
