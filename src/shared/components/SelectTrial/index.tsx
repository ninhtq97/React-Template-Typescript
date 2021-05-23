import { debounce } from 'lodash';
import {
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

const initState = {
  selected: [],
  showOptions: false,
  options: [],
  keyword: '',
  isLoading: false,
};

const Select = forwardRef<HTMLDivElement, any>(
  (
    { isMultiple, isDisable, loadOptions, value, onChange, placeholder },
    $ref
  ) => {
    const [selected, setSelected] = useState<SelectedValue[]>(
      initState.selected
    );
    const [showOptions, setShowOptions] = useState(initState.showOptions);
    const [options, setOptions] = useState<SelectedValue[]>(initState.options);
    const [keyword, setKeyword] = useState(initState.keyword);
    const [isLoading, setIsLoading] = useState(initState.isLoading);

    useEffect(() => {
      let defaultSelected = [];

      const isArray = Array.isArray(value);

      if (value) {
        defaultSelected = isArray ? value : [value];
      }

      setSelected(defaultSelected);
    }, [value]);

    const removeSelectedOptions = (
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
    const callbackFetchOptions = useCallback(
      debounce(async (...args: any) => {
        if (loadOptions) {
          setIsLoading(true);
          let data = await loadOptions(...args);

          removeSelectedOptions(data, ...args);

          setTimeout(() => {
            setIsLoading(initState.isLoading);
          }, 500);
        }
      }, 500),
      []
    );

    useEffect(() => {
      callbackFetchOptions(
        keyword,
        selected.map((e) => e.value)
      );
    }, [keyword, selected, callbackFetchOptions]);

    const $selectRef = useRef<HTMLDivElement>();

    /* Xử lý click ra ngoài */
    // useOnOutsideClick($selectRef, showOptions, setShowOptions);

    const handleShowOptions = () => setShowOptions(!showOptions);

    const selectOption = (option: SelectedValue) => {
      onChange(isMultiple ? [...selected, option] : option);
      setSelected((prev) => (isMultiple ? [...prev, option] : [option]));
      setKeyword(initState.keyword);
      handleShowOptions();
    };

    const removeSelected = (
      e: MouseEvent<HTMLElement>,
      option: SelectedValue
    ) => {
      e.stopPropagation();
      const restSelected = selected.filter((x) => x.value !== option.value);

      setSelected(restSelected);
      onChange(restSelected);
    };

    const clearSelected = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      setSelected(initState.selected);
      onChange(initState.selected);
    };

    const selectSearch = (value) => setKeyword(value);

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
