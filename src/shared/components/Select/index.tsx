import { PlusOutline } from '@styled-icons/evaicons-outline';
import { FC, useRef, useState } from 'react';
import { KeyCodes } from 'shared/constants/keyCode';
import useOnOutsideClick from 'shared/hooks/onOutsideClick';
import { SelectOption, SelectVariant } from 'shared/types/select';
import Icon from '../Icon';
// import useOnOutsideClick from 'shared/hooks/onOutsideClick';
import Dropdown from './Dropdown';
import {
  AddMore,
  ChevronIcon,
  ClearIcon,
  Placeholder,
  StyledSelect,
  ValueContainer,
  ValueMulti,
  ValueMultiItem,
} from './Styles';

type Props = {
  className?: string;
  isMulti?: boolean;
  variant?: SelectVariant;
  dropdownWidth?: number;
  value?: string | SelectOption[];
  defaultValue?: any;
  options: SelectOption[];
  renderValue?: FC<any>;
  renderOption?: FC<any>;
  placeholder?: string;
  invalid?: boolean;
  withClearValue?: boolean;
  onChange?: Function;
  onCreate?: Function;
};

const Select: FC<Props> = ({
  className,
  variant = 'normal',
  dropdownWidth,
  value: propsValue,
  defaultValue,
  placeholder = 'Select',
  invalid = false,
  options,
  onChange,
  onCreate,
  isMulti = false,
  withClearValue,
  renderValue: propsRenderValue,
  renderOption: propsRenderOption,
}) => {
  const [stateValue, setStateValue] = useState(
    defaultValue || (isMulti ? [] : null)
  );
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const isControlled = propsValue !== undefined;
  const value = isControlled ? propsValue : stateValue;

  const $selectRef = useRef<any>();
  const $inputRef = useRef<any>();

  const activateDropdown = () => {
    if (isDropdownOpen) {
      $inputRef.current.focus();
    } else {
      setDropdownOpen(true);
    }
  };

  const deactivateDropdown = () => {
    setDropdownOpen(false);
    setSearchValue('');
    $selectRef.current.focus();
  };

  useOnOutsideClick($selectRef, isDropdownOpen, deactivateDropdown);

  const preserveValueType = (newValue) => {
    const areOptionValuesNumbers = options.some(
      (option) => typeof option.value === 'number'
    );

    if (areOptionValuesNumbers) {
      if (isMulti) {
        return newValue.map(Number);
      }
      if (newValue) {
        return Number(newValue);
      }
    }
    return newValue;
  };

  const handleChange = (newValue) => {
    if (!isControlled) {
      setStateValue(preserveValueType(newValue));
    }
    if (onChange) onChange(preserveValueType(newValue));
  };

  const removeOptionValue = (optionValue) => {
    handleChange(value.filter((val) => val !== optionValue));
  };

  const handleFocusedSelectKeydown = (event) => {
    if (isDropdownOpen) return;

    if (event.keyCode === KeyCodes.ENTER) {
      event.preventDefault();
    }
    if (
      event.keyCode !== KeyCodes.ESCAPE &&
      event.keyCode !== KeyCodes.TAB &&
      !event.shiftKey
    ) {
      setDropdownOpen(true);
    }
  };

  const getOption = (optionValue) =>
    options.find((option) => option.value === optionValue);
  const getOptionLabel = (optionValue) =>
    (getOption(optionValue) || { label: '' }).label;

  const isValueEmpty = isMulti ? !value.length : !getOption(value);

  return (
    <StyledSelect
      className={className}
      variant={variant}
      ref={$selectRef}
      tabIndex="0"
      onKeyDown={handleFocusedSelectKeydown}
      invalid={invalid}
    >
      <ValueContainer variant={variant} onClick={activateDropdown}>
        {isValueEmpty && <Placeholder>{placeholder}</Placeholder>}

        {!isValueEmpty && !isMulti && propsRenderValue
          ? propsRenderValue({ value })
          : getOptionLabel(value)}

        {!isValueEmpty && isMulti && (
          <ValueMulti variant={variant}>
            {value.map((optionValue) =>
              propsRenderValue ? (
                propsRenderValue({
                  value: optionValue,
                  removeOptionValue: () => removeOptionValue(optionValue),
                })
              ) : (
                <ValueMultiItem
                  key={optionValue}
                  onClick={() => removeOptionValue(optionValue)}
                >
                  {getOptionLabel(optionValue)}
                  <Icon>
                    <ClearIcon size={18} />
                  </Icon>
                </ValueMultiItem>
              )
            )}
            <AddMore>
              <Icon>
                <PlusOutline size={16} />
              </Icon>
              Add more
            </AddMore>
          </ValueMulti>
        )}

        {(!isMulti || isValueEmpty) && variant !== 'empty' && (
          <Icon>
            <ChevronIcon size={20} />
          </Icon>
        )}
      </ValueContainer>

      {isDropdownOpen && (
        <Dropdown
          dropdownWidth={dropdownWidth}
          value={value}
          isValueEmpty={isValueEmpty}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          $inputRef={$inputRef}
          deactivateDropdown={deactivateDropdown}
          options={options}
          onChange={handleChange}
          onCreate={onCreate}
          isMulti={isMulti}
          withClearValue={withClearValue}
          propsRenderOption={propsRenderOption}
        />
      )}
    </StyledSelect>
  );
};

export default Select;
