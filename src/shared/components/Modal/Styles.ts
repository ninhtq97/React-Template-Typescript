import Icon from 'shared/components/Icon';
import color from 'shared/styles/color';
import mixin, { zIndexValues } from 'shared/styles/mixin';
import styled, { css } from 'styled-components';

export const ScrollOverlay = styled.div`
  z-index: ${zIndexValues.modal};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  ${mixin.scrollableY}
`;

export const ClickableOverlay = styled.div<Record<string, any>>`
  min-height: 100%;
  background: rgba(9, 30, 66, 0.54);
  ${(props) => clickOverlayStyles[props.variant]}
`;

const clickOverlayStyles = {
  center: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
  `,
  aside: '',
};

export const StyledModal = styled.div<Record<string, any>>`
  display: inline-block;
  position: relative;
  width: 100%;
  background: #fff;
  ${(props) => modalStyles[props.variant]}
`;

const modalStyles = {
  center: css<Record<string, any>>`
    max-width: ${(props) => props.width}px;
    vertical-align: middle;
    border-radius: 3px;
    ${mixin.boxShadowMedium}
  `,
  aside: css<Record<string, any>>`
    min-height: 100vh;
    max-width: ${(props) => props.width}px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
  `,
};

export const CloseIcon = styled(Icon)`
  position: absolute;
  color: ${color.textMedium};
  transition: all 0.1s;
  ${mixin.clickable}
  ${(props) => closeIconStyles[props.variant]}
`;

const closeIconStyles = {
  center: css`
    top: 10px;
    right: 12px;
    padding: 3px 5px 0px 5px;
    border-radius: 4px;
    &:hover {
      background: ${color.backgroundLight};
    }
  `,
  aside: css`
    top: 10px;
    right: -30px;
    width: 50px;
    height: 50px;
    padding-top: 10px;
    border-radius: 3px;
    text-align: center;
    background: #fff;
    border: 1px solid ${color.borderLightest};
    ${mixin.boxShadowMedium};
    &:hover {
      color: ${color.primary};
    }
  `,
};
