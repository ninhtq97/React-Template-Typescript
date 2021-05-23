import { uniq } from 'lodash';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { KeyCodes } from 'shared/constants/keyCode';
import Icon from '../Icon';
import {
  ClearIcon,
  Dropdown,
  DropdownInput,
  DropdownInputContainer,
  Option,
  Options,
  OptionsNoResults,
} from './Styles';

const SelectDropdown = ({
  dropdownWidth,
  value,
  isValueEmpty,
  searchValue,
  setSearchValue,
  $inputRef,
  deactivateDropdown,
  options,
  onChange,
  onCreate,
  isMulti,
  withClearValue,
  propsRenderOption,
}) => {
  const [isCreatingOption, setCreatingOption] = useState(false);

  const $optionsRef = useRef<any>();

  useLayoutEffect(() => {
    const setFirstOptionAsActive = () => {
      const $active = getActiveOptionNode();
      if ($active) $active.classList.remove(activeOptionClass);

      if ($optionsRef.current.firstElementChild) {
        $optionsRef.current.firstElementChild.classList.add(activeOptionClass);
      }
    };
    setFirstOptionAsActive();
  });

  const selectOptionValue = (optionValue) => {
    deactivateDropdown();
    if (isMulti) {
      onChange(uniq([...value, optionValue]));
    } else {
      onChange(optionValue);
    }
  };

  const createOption = (newOptionLabel) => {
    setCreatingOption(true);
    onCreate(newOptionLabel, (createdOptionValue) => {
      setCreatingOption(false);
      selectOptionValue(createdOptionValue);
    });
  };

  const clearOptionValues = () => {
    $inputRef.current.value = '';
    $inputRef.current.focus();
    onChange(isMulti ? [] : null);
  };

  const handleInputKeyDown = (event) => {
    if (event.keyCode === KeyCodes.ESCAPE) {
      handleInputEscapeKeyDown(event);
    } else if (event.keyCode === KeyCodes.ENTER) {
      handleInputEnterKeyDown(event);
    } else if (
      event.keyCode === KeyCodes.ARROW_DOWN ||
      event.keyCode === KeyCodes.ARROW_UP
    ) {
      handleInputArrowUpOrDownKeyDown(event);
    }
  };

  const handleInputEscapeKeyDown = (event) => {
    event.nativeEvent.stopImmediatePropagation();
    deactivateDropdown();
  };

  const handleInputEnterKeyDown = (event) => {
    event.preventDefault();

    const $active = getActiveOptionNode();
    if (!$active) return;

    const optionValueToSelect = $active.getAttribute(
      'data-select-option-value'
    );
    const optionLabelToCreate = $active.getAttribute(
      'data-create-option-label'
    );

    if (optionValueToSelect) {
      selectOptionValue(optionValueToSelect);
    } else if (optionLabelToCreate) {
      createOption(optionLabelToCreate);
    }
  };

  const handleInputArrowUpOrDownKeyDown = (event) => {
    const $active = getActiveOptionNode();
    if (!$active) return;

    const $options = $optionsRef.current;
    const $optionsHeight = $options.getBoundingClientRect().height;
    const $activeHeight = $active.getBoundingClientRect().height;

    if (event.keyCode === KeyCodes.ARROW_DOWN) {
      if ($options.lastElementChild === $active) {
        $active.classList.remove(activeOptionClass);
        $options.firstElementChild.classList.add(activeOptionClass);
        $options.scrollTop = 0;
      } else {
        $active.classList.remove(activeOptionClass);
        $active.nextElementSibling.classList.add(activeOptionClass);
        if ($active.offsetTop > $options.scrollTop + $optionsHeight / 1.4) {
          $options.scrollTop += $activeHeight;
        }
      }
    } else if (event.keyCode === KeyCodes.ARROW_UP) {
      if ($options.firstElementChild === $active) {
        $active.classList.remove(activeOptionClass);
        $options.lastElementChild.classList.add(activeOptionClass);
        $options.scrollTop = $options.scrollHeight;
      } else {
        $active.classList.remove(activeOptionClass);
        $active.previousElementSibling.classList.add(activeOptionClass);
        if ($active.offsetTop < $options.scrollTop + $optionsHeight / 2.4) {
          $options.scrollTop -= $activeHeight;
        }
      }
    }
  };

  const handleOptionMouseEnter = (event) => {
    const $active = getActiveOptionNode();
    if ($active) $active.classList.remove(activeOptionClass);
    event.currentTarget.classList.add(activeOptionClass);
  };

  const getActiveOptionNode = () =>
    $optionsRef.current.querySelector(`.${activeOptionClass}`);

  const optionsFilteredBySearchValue = options.filter((option) =>
    option.label.toString().toLowerCase().includes(searchValue.toLowerCase())
  );

  const removeSelectedOptionsMulti = (opts) =>
    opts.filter((option) => !value.includes(option.value));
  const removeSelectedOptionsSingle = (opts) =>
    opts.filter((option) => value !== option.value);

  const filteredOptions = isMulti
    ? removeSelectedOptionsMulti(optionsFilteredBySearchValue)
    : removeSelectedOptionsSingle(optionsFilteredBySearchValue);

  const isSearchValueInOptions = options
    .map((option) => option.label)
    .includes(searchValue);
  const isOptionCreatable = onCreate && searchValue && !isSearchValueInOptions;

  return (
    <Dropdown width={dropdownWidth}>
      <DropdownInputContainer>
        <DropdownInput
          type="text"
          placeholder="Search"
          ref={$inputRef}
          autoFocus
          onKeyDown={handleInputKeyDown}
          onChange={(event) => setSearchValue(event.target.value)}
        />

        {!isValueEmpty && withClearValue && (
          <Icon onClick={clearOptionValues}>
            <ClearIcon size={20} />
          </Icon>
        )}
      </DropdownInputContainer>

      <Options ref={$optionsRef}>
        {filteredOptions.map((option) => (
          <Option
            key={option.value}
            data-select-option-value={option.value}
            data-testid={`select-option:${option.label}`}
            onMouseEnter={handleOptionMouseEnter}
            onClick={() => selectOptionValue(option.value)}
          >
            {propsRenderOption ? propsRenderOption(option) : option.label}
          </Option>
        ))}

        {isOptionCreatable && (
          <Option
            data-create-option-label={searchValue}
            onMouseEnter={handleOptionMouseEnter}
            onClick={() => createOption(searchValue)}
          >
            {isCreatingOption
              ? `Creating "${searchValue}"...`
              : `Create "${searchValue}"`}
          </Option>
        )}
      </Options>

      {filteredOptions.length === 0 && (
        <OptionsNoResults>No results</OptionsNoResults>
      )}
    </Dropdown>
  );
};

const activeOptionClass = 'jira-select-option-is-active';

export default SelectDropdown;
