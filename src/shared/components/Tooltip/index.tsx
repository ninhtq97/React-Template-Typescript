import { FC, MutableRefObject, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useOnOutsideClick from 'shared/hooks/onOutsideClick';
import { Placement } from 'shared/types/common';
import { StyledTooltip, TooltipLink, TooltipPopper } from './Styles';

type Props = {
  title: string;
  placement?: Placement;
};

const Tooltip: FC<Props> = ({ title, placement = 'bottom', children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const $linkRef = useRef<any>(null);
  const $tooltipRef = useRef<any>(null);

  const openTooltip = () => setIsOpen(true);
  const closeTooltip = () => setIsOpen(false);

  useOnOutsideClick([$tooltipRef, $linkRef], isOpen, closeTooltip);

  useLayoutEffect(() => {
    const setTooltipPosition = () => {
      const { top, left } = calcPosition(placement, $tooltipRef, $linkRef);
      $tooltipRef.current.style.transform = `translate(${left}px, ${top}px)`;
    };

    if (isOpen) {
      setTooltipPosition();
      window.addEventListener('resize', setTooltipPosition);
      window.addEventListener('scroll', setTooltipPosition);
    }

    return () => {
      window.removeEventListener('resize', setTooltipPosition);
      window.removeEventListener('scroll', setTooltipPosition);
    };
  }, [isOpen, placement]);

  return (
    <StyledTooltip
      onMouseEnter={openTooltip}
      onMouseLeave={closeTooltip}
      onBlur={closeTooltip}
    >
      <TooltipLink ref={$linkRef}>{children}</TooltipLink>

      {isOpen &&
        createPortal(
          <TooltipPopper ref={$tooltipRef}>{title}</TooltipPopper>,
          $root
        )}
    </StyledTooltip>
  );
};

const calcPosition = (
  placement: Placement,
  $tooltipRef: MutableRefObject<any>,
  $linkRef: MutableRefObject<any>
) => {
  const margin = 10;

  const tooltipRect = $tooltipRef.current.getBoundingClientRect();
  const linkRect = $linkRef.current.getBoundingClientRect();

  const linkCenterY = linkRect.top + linkRect.height / 2;
  const linkCenterX = linkRect.left + linkRect.width / 2;

  const placements = {
    top: {
      top: linkRect.top - margin - tooltipRect.height,
      left: linkCenterX - tooltipRect.width / 2,
    },
    right: {
      top: linkCenterY - tooltipRect.height / 2,
      left: linkRect.right + margin,
    },
    bottom: {
      top: linkRect.bottom + margin,
      left: linkCenterX - tooltipRect.width / 2,
    },
    left: {
      top: linkCenterY - tooltipRect.height / 2,
      left: linkRect.left - margin - tooltipRect.width,
    },
  };
  return placements[placement];
};

const $root = document.getElementById('root')!!;

export default Tooltip;
