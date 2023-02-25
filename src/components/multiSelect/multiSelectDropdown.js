import { useState, useEffect } from "react";
import MultiSelectOptions from "./multiSelectOptions";
import { useQuery } from "react-query";
import { useDebounce } from "../../hooks/useDebounce";

async function fetchData(url) {
  const res = await fetch(url);
  return res.json();
}

function MultiSelectDropdown({ selectedValue, setSelectedValue, url }) {
  const [value, setValue] = useState("");
  const searchQuery = useDebounce(value, 500);
  const { isLoading, data, refetch } = useQuery(
    ["dropdown-options", url + searchQuery],
    async () => await fetchData(url + searchQuery),
    {
      staleTime: 60000,
    }
  );

  useEffect(() => {
    refetch();
  }, [searchQuery, refetch]);

  function handleInputChange(event) {
    setValue(event.target.value);
  }

  function handleSelect(text, isAddable) {
    if (isAddable) {
      setSelectedValue((prevValue) => {
        if (!prevValue) {
          return text;
        }
        return `${prevValue}, ${text}`;
      });
    } else {
      setSelectedValue((prevValue) => {
        const prevValueArr = prevValue.split(",");
        const newValue = prevValueArr.reduce((values, val) => {
          if (val.trim() !== text) {
            values.push(val);
          }
          return values;
        }, []);
        return newValue.join(",");
      });
    }
  }

  function handleClick() {
    setSelectedValue("");
  }

  return (
    <div className="multi-select-dropdown">
      <div className="multi-select-input">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          aria-label="multi-select-search"
          placeholder="Please search query"
        />
      </div>
      <div className="multi-select-options">
        <MultiSelectOptions
          isLoading={isLoading}
          count={data?.count}
          options={data?.entries}
          onClick={handleSelect}
          selectedValue={selectedValue}
        />
      </div>
      <div className="multi-select-actions">
        <button className="btn-clear" onClick={handleClick}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default MultiSelectDropdown;
