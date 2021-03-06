import { CloseOutline } from '@styled-icons/evaicons-outline';
import { ChevronDown } from '@styled-icons/ionicons-solid';
import styled, { css } from 'styled-components';
import Input from '../Input';

export const SelectIndicator = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectIcon = styled.div<Record<string, any>>`
  position: relative;
  padding: 8px;

  ${(props) =>
    props.hasValue &&
    css`
      margin-left: 8px;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 1px;
        height: 20px;
        background-color: #e6e6e6;
      }
    `}
`;

export const SelectArrow = styled(ChevronDown)`
  transition: all 100ms;
  color: #ccc;
`;

export const SelectControl = styled.div<Record<string, any>>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: #ffffff;
  border: 1px solid #ebedf3;
  transition: all 100ms;
`;

export const SelectValue = styled.div`
  flex: 1;
  padding: 4px 8px;
  display: flex;
  align-items: center;
`;

export const SelectValueItem = styled.div<Record<string, any>>`
  position: relative;
  display: flex;
  align-items: center;

  ${(props) =>
    props.isMultiple
      ? css`
          color: #243656;
          cursor: pointer;
          background-color: #f7f7f7;
          margin-right: 8px;
          padding: 4px 8px;
          border-radius: 4px;

          &:hover {
            background: rgba(31 211 146 0.1);
            color: #1fd392;
          }
        `
      : css``}
`;

export const SelectPlaceholder = styled.span`
  user-select: none;
  color: #bac1cf;
`;

export const SelectText = styled.span``;

export const SelectRemove = styled.div<Record<string, any>>`
  cursor: pointer;
  margin-left: 4px;
  ${(props) =>
    props.isRemoveAll &&
    css`
      color: #ccc;
      &:hover {
        color: #999;
      }
    `};
`;
export const SelectRemoveIcon = styled(CloseOutline)``;

export const SelectOptionsContainer = styled.div`
  position: absolute;
  top: calc(100% + 1px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: 100%;
  border: 1px solid #ebedf3;
  padding: 10px;
  background-color: #fff;
`;

export const SelectSearch = styled(Input)`
  margin-bottom: 10px;
`;

export const SelectOptions = styled.div`
  position: relative;
  border-top: 1px solid #ebedf3;
  padding: 10px 0;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SelectOptionItem = styled.div<Record<string, any>>`
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

export const SelectContainer = styled.div``;

export const EmptyData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: #bac1cf;
  margin-top: 10px;
`;

export const StyledSelect = styled.div<Record<string, any>>`
  position: relative;

  ${(props) =>
    props.showOptions
      ? css`
          ${SelectControl} {
            border: 1px solid #4c9aff;
            box-shadow: 0 0 0 1px #4c9aff;
          }
        `
      : css`
          &:hover {
            ${SelectControl} {
              border-color: #b3b3b3;
            }

            ${SelectArrow} {
              color: #999;
            }
          }
        `};

  ${(props) =>
    props.isDisable
      ? css`
          pointer-events: none;

          ${SelectControl} {
            background-color: #ebedf3;
          }
        `
      : css``}
`;
