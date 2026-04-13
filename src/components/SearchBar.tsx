"use client";
import { observer } from "mobx-react-lite";
import { SearchDropdown } from "./searchBar/SearchDropDown";
import { SearchEmpty } from "./searchBar/SearchEmpty";
import { SearchInput } from "./searchBar/SearchInput";
import { useSearch } from "./searchBar/useSearch";

export const SearchBar = observer(() => {
  const {
    query,
    isOpen,
    highlighted,
    results,
    inputRef,
    dropdownRef,
    handleSelect,
    handleQueryChange,
    handleClear,
    handleKeyDown,
    handleFocus,
    setHighlighted,
  } = useSearch();

  return (
    <div className="relative w-full max-w-sm">
      <SearchInput
        query={query}
        inputRef={inputRef}
        onChange={handleQueryChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onClear={handleClear}
      />

      {isOpen && results.length > 0 && (
        <SearchDropdown
          results={results}
          query={query}
          highlighted={highlighted}
          dropdownRef={dropdownRef}
          onSelect={handleSelect}
          onMouseEnter={setHighlighted}
        />
      )}

      {isOpen && query.trim().length > 0 && results.length === 0 && (
        <SearchEmpty query={query} dropdownRef={dropdownRef} />
      )}
    </div>
  );
});
