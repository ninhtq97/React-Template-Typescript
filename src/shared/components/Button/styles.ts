import color from 'shared/styles/color';
import { font } from 'shared/styles/font';
import mixin from 'shared/styles/mixin';
import styled, { css } from 'styled-components';
import Spinner from '../Loading/Spinner';

export const StyledButton = styled.button<Record<string, any>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  vertical-align: middle;
  border: none;
  line-height: 1;
  padding: 0 ${(props) => (props.iconOnly ? 8 : 12)}px;
  white-space: nowrap;
  border-radius: 3px;
  transition: all 0.1s;
  appearance: none;
  ${mixin.clickable}
  ${font.size(14.5)}
  ${(props) => buttonVariants[props.variant]}
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const colored = css<Record<string, any>>`
  color: ${color.white};
  background: ${(props) => color[props.variant]};
  ${font.medium}
  &:not(:disabled) {
    &:hover {
      background: ${(props) => mixin.lighten(color[props.variant], 0.15)};
    }
    &:active {
      background: ${(props) => mixin.darken(color[props.variant], 0.1)};
    }
    ${(props) =>
      props.isActive &&
      css`
        background: ${mixin.darken(color[props.variant], 0.1)} !important;
      `}
  }
`;

const secondaryAndEmptyShared = css<Record<string, any>>`
  color: ${color.textDark};
  ${font.regular}
  &:not(:disabled) {
    &:hover {
      background: ${color.backgroundLight};
    }
    &:active {
      color: ${color.primary};
      background: ${color.backgroundLightPrimary};
    }
    ${(props) =>
      props.isActive &&
      css`
        color: ${color.primary};
        background: ${color.backgroundLightPrimary} !important;
      `}
  }
`;

const buttonVariants = {
  primary: colored,
  success: colored,
  danger: colored,
  warning: colored,
  secondary: css`
    background: ${color.secondary};
    ${secondaryAndEmptyShared};
  `,
  empty: css`
    background: #fff;
    ${secondaryAndEmptyShared};
  `,
};

export const StyledSpinner = styled(Spinner)`
  position: relative;
  top: 1px;
`;

export const Text = styled.p<{ withPadding: boolean }>`
  padding-left: ${(props) => (props.withPadding ? 6 : 0)}px;
`;
