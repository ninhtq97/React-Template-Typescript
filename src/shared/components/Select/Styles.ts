import { CloseOutline } from '@styled-icons/evaicons-outline';
import { ChevronDown } from '@styled-icons/ionicons-solid';
import styled, { css } from 'styled-components';

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

export const FieldInput = styled.input<Record<string, any>>`
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

export const SelectSearch = styled(FieldInput)`
  user-select: none;
  margin-bottom: 10px;
`;

export const SelectOptions = styled.div`
  position: relative;
  border-top: 1px solid #ebedf3;
  padding: 10px 0;
`;

export const SelectOptionItem = styled.div<Record<string, any>>`
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 4px;
  }

  &:hover {
    background-color: #eee;
  }
`;

export const SelectContainer = styled.div``;

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
