import { uniq } from 'lodash';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import useOnOutsideClick from 'shared/hooks/onOutsideClick';
import { SelectOption } from 'shared/types/select';
import Dropdown from './Dropdown';
import {
  SelectArrow,
  SelectContainer,
  SelectControl,
  SelectIcon,
  SelectIndicator,
  SelectPlaceholder,
  SelectRemove,
  SelectRemoveIcon,
  SelectValue,
  SelectValueItem,
  StyledSelect,
} from './Styles';

const Select = forwardRef<any, any>(
  (
    { isMultiple, isDisable, loadOptions, value, onChange, placeholder },
    $ref
  ) => {
    const [selected, setSelected] = useState<SelectOption[]>([]);
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
      let defaultSelected = [];

      const isArray = Array.isArray(value);

      if (value) {
        defaultSelected = isArray ? value : [value];
      }

      setSelected(defaultSelected);
    }, [value]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchOptions = useCallback(
      async (params) => {
        if (loadOptions) {
          setIsLoading(true);

          const data = await loadOptions(params);

          setOptions(data);
          setIsLoading(false);
        }
      },
      [loadOptions]
    );

    useEffect(() => {
      if (isDropdownOpen) {
        fetchOptions({ q: searchValue });
      }
    }, [fetchOptions, isDropdownOpen, searchValue]);

    const $selectRef = useRef<HTMLDivElement>();

    const handleShowDropdown = () => setDropdownOpen(!isDropdownOpen);

    useOnOutsideClick($selectRef, isDropdownOpen, handleShowDropdown);

    const selectOption = (option: SelectOption) => {
      onChange(isMultiple ? uniq([...selected, option]) : option);
      setSelected((prev) => (isMultiple ? uniq([...prev, option]) : [option]));
      setSearchValue('');
      handleShowDropdown();
    };

    const removeSelected = (e, option: SelectOption) => {
      e.stopPropagation();

      const restSelected = selected.filter((x) => x.value !== option.value);

      setSelected(restSelected);
      onChange(restSelected);
    };

    const clearSelected = (e) => {
      e.stopPropagation();

      setSelected([]);
      onChange([]);
    };

    return (
      <StyledSelect
        isDropdownOpen={isDropdownOpen}
        isDisable={isDisable}
        ref={$selectRef}
      >
        <SelectContainer ref={$ref}>
          <SelectControl onClick={handleShowDropdown}>
            <SelectValue>
              {selected.length ? (
                selected.map((s) => (
                  <SelectValueItem isMultiple={isMultiple} key={s.value}>
                    {s.label}
                    {isMultiple && (
                      <SelectRemove onClick={(e) => removeSelected(e, s)}>
                        <SelectRemoveIcon size={18} />
                      </SelectRemove>
                    )}
                  </SelectValueItem>
                ))
              ) : (
                <SelectPlaceholder>{placeholder}</SelectPlaceholder>
              )}
            </SelectValue>
            <SelectIndicator>
              {isMultiple && selected.length ? (
                <SelectRemove onClick={clearSelected} isRemoveAll>
                  <SelectRemoveIcon size={20} />
                </SelectRemove>
              ) : null}
              <SelectIcon hasValue={!!selected.length}>
                <SelectArrow size={20} />
              </SelectIcon>
            </SelectIndicator>
          </SelectControl>
          {isDropdownOpen && (
            <Dropdown
              isMultiple={isMultiple}
              value={selected}
              options={options}
              onChange={selectOption}
              isLoading={isLoading}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          )}
        </SelectContainer>
      </StyledSelect>
    );
  }
);

export default Select;
