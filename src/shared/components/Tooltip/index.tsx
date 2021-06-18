import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { TooltipPlacement } from 'shared/types/common';
import { StyledTooltip, TooltipTitle } from './Styles';

type Props = {
  title: string;
  placement?: TooltipPlacement;
};

const Tooltip: FC<Props> = ({ title, placement = 'bottom', children }) => {
  const [isHover, setIsHover] = useState(false);

  const mouseEnter = () => setIsHover(true);
  const mouseLeave = () => setIsHover(false);

  return (
    <StyledTooltip onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      {children}

      {isHover && createPortal(<TooltipTitle>{title}</TooltipTitle>, $root)}
    </StyledTooltip>
  );
};

const $root = document.getElementById('root')!!;

export default Tooltip;
