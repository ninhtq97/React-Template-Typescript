import { debounce } from 'lodash';
import {
  ChangeEvent,
  forwardRef,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SelectedValue } from 'shared/@types/select';
import EmptyData from '../EmptyData';
import PlaceholderLoading from '../Loading/Placeholder';
import {
  SelectArrow,
  SelectContainer,
  SelectControl,
  SelectIcon,
  SelectIndicator,
  SelectOptionItem,
  SelectOptions,
  SelectOptionsContainer,
  SelectPlaceholder,
  SelectRemove,
  SelectRemoveIcon,
  SelectSearch,
  SelectValue,
  SelectValueItem,
  StyledSelect,
} from './Styles';

const Select = forwardRef<any, any>(
  (
    { isMultiple, isDisable, loadOptions, value, onChange, placeholder },
    $ref
  ) => {
    const [selected, setSelected] = useState<SelectedValue[]>([]);
    const [showOptions, setShowOptions] = useState(false);
    const [options, setOptions] = useState<SelectedValue[]>([]);
    const [keyword, setKeyword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      let defaultSelected = [];

      const isArray = Array.isArray(value);

      if (value) {
        defaultSelected = isArray ? value : [value];
      }

      setSelected(defaultSelected);
    }, [value]);

    const handleOptions = (
      options: SelectedValue[],
      searchText?: string,
      selectedList?: string[]
    ) => {
      let newOptions = options;

      if (selectedList?.length) {
        selectedList.forEach((y) => {
          newOptions = newOptions.filter((x) => x.value !== y);
        });
      }

      newOptions = newOptions.filter((x) =>
        new RegExp(`${searchText}`, 'gi').test(x.label)
      );

      setOptions(newOptions);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchOptions = useCallback(
      debounce(async (...args: any) => {
        if (loadOptions) {
          setIsLoading(true);
          let data = await loadOptions(...args);

          handleOptions(data, ...args);

          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      }, 500),
      []
    );

    useEffect(() => {
      fetchOptions(
        keyword,
        selected.map((e) => e.value)
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, selected]);

    const $selectRef = useRef<HTMLDivElement>();

    /* Xử lý click ra ngoài */
    // useOnOutsideClick($selectRef, showOptions, setShowOptions);

    const handleShowOptions = () => setShowOptions(!showOptions);

    const selectOption = (option: SelectedValue) => {
      const data = isMultiple ? [...selected, option] : [option];

      onChange(data);
      setSelected(data);
      setKeyword('');
      handleShowOptions();
    };

    const removeSelected = (
      e: MouseEvent<HTMLElement>,
      option: SelectedValue
    ) => {
      e.stopPropagation();
      setSelected(selected.filter((x) => x.value !== option.value));
    };

    const clearSelected = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setSelected([]);
    };

    const selectSearch = (e: ChangeEvent<HTMLInputElement>) =>
      setKeyword(e.target.value);

    return (
      <StyledSelect
        showOptions={showOptions}
        isDisable={isDisable}
        ref={$selectRef}
      >
        <SelectContainer ref={$ref}>
          <SelectControl onClick={handleShowOptions}>
            <SelectValue>
              {selected.length ? (
                selected.map((s) => (
                  <SelectValueItem isMultiple={isMultiple} key={s.value}>
                    {s.label}
                    {isMultiple && (
                      <SelectRemove
                        onClick={(e: MouseEvent<HTMLElement>) =>
                          removeSelected(e, s)
                        }
                      >
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
          {showOptions && (
            <SelectOptionsContainer>
              <SelectSearch
                placeholder="Tìm kiếm..."
                value={keyword}
                onChange={selectSearch}
              />

              <SelectOptions>
                {isLoading && <PlaceholderLoading />}
                {!isLoading && options.length ? (
                  options.map((option) => (
                    <SelectOptionItem
                      key={option.value}
                      value={option.value}
                      onClick={() => selectOption(option)}
                    >
                      {option.label}
                    </SelectOptionItem>
                  ))
                ) : (
                  <EmptyData />
                )}
              </SelectOptions>
            </SelectOptionsContainer>
          )}
        </SelectContainer>
      </StyledSelect>
    );
  }
);

export default Select;
