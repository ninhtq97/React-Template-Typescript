import color from 'shared/styles/color';
import mixin from 'shared/styles/mixin';
import styled from 'styled-components';

export const StyledTooltip = styled.div`
  display: inline-flex;
`;

export const TooltipLink = styled.div``;

export const TooltipPopper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  background: ${mixin.rgba(color.dark, 0.6)};
  padding: 4px 8px;
  border-radius: 4px;
  color: ${color.white};
  font-size: 12px;
`;
