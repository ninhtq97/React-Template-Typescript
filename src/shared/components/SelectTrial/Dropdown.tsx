import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import {
  EmptyData,
  SelectOptionItem,
  SelectOptions,
  SelectOptionsContainer,
  SelectSearch,
} from './Styles';

const SelectDropdown = ({
  isMultiple,
  value,
  options,
  onChange,
  isLoading,
  searchValue,
  setSearchValue,
}) => {
  const [keyword, setKeyword] = useState('');

  const selectOptionValue = (optionValue) => {
    onChange(optionValue);
  };

  const removeSelectedOptions = (opts) => {
    return opts.filter(
      (option) => !value.find((x) => x.value === option.value)
    );
  };

  const optionsFilteredBySearchValue = options.filter((option) =>
    option.label.toString().toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredOptions = removeSelectedOptions(optionsFilteredBySearchValue);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeKeyword = useCallback(
    debounce((newValue) => setSearchValue(newValue), 500),
    []
  );

  return (
    <SelectOptionsContainer>
      <SelectSearch
        placeholder="Tìm kiếm..."
        value={keyword}
        onChange={(newValue) => {
          setKeyword(newValue);
          onChangeKeyword(newValue);
        }}
      />

      <SelectOptions>
        {isLoading ? (
          <>Loading...</>
        ) : filteredOptions.length ? (
          filteredOptions.map((option) => (
            <SelectOptionItem
              key={option.value}
              onClick={() => selectOptionValue(option)}
            >
              {option.label}
            </SelectOptionItem>
          ))
        ) : (
          <EmptyData>Không có kết quả nào</EmptyData>
        )}
      </SelectOptions>
    </SelectOptionsContainer>
  );
};

export default SelectDropdown;
