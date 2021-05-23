import { PlusOutline } from '@styled-icons/evaicons-outline';
import { useRef, useState } from 'react';
import { KeyCodes } from 'shared/constants/keyCode';
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

const defaultProps = {
  className: undefined,
  variant: 'normal',
  dropdownWidth: undefined,
  name: undefined,
  value: undefined,
  defaultValue: undefined,
  placeholder: 'Select',
  invalid: false,
  onCreate: undefined,
  isMulti: false,
  withClearValue: true,
  renderValue: undefined,
  renderOption: undefined,
};

const Select = ({
  className,
  variant,
  dropdownWidth,
  name,
  value: propsValue,
  defaultValue,
  placeholder,
  invalid,
  options,
  onChange,
  onCreate,
  isMulti,
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

  // useOnOutsideClick($selectRef, isDropdownOpen, deactivateDropdown);

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
    onChange(preserveValueType(newValue));
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

Select.defaultProps = defaultProps;

export default Select;
