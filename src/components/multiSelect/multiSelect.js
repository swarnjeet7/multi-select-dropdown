import { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import MultiSelectOptions from "./multiSelectOptions";
import "./multiSelect.css";

async function getData({ queryKey }) {
  const url = queryKey[1];
  const res = await fetch(url);
  return res.json();
}

function MultiSelect({
  isCacheAble = true,
  fetchConfig,
  selectedValue,
  setSelectedValue,
}) {
  const multiSelectRef = useRef(null);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const { data, isLoading, refetch } = useQuery(
    ["option-list", fetchConfig.url + value],
    getData,
    {
      enabled: false,
      staleTime: 60000,
      cacheTime: 300000,
    }
  );

  function handleClickOutside(event) {
    if (
      multiSelectRef.current &&
      !multiSelectRef.current.contains(event.target)
    ) {
      setShow(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);

    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  useEffect(() => {
    refetch();
  }, [value, refetch]);

  function handleOnSelect(text, isAddable) {
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

  function handleInputChange(event) {
    setValue(event.target.value);
    setShow(true);
  }

  return (
    <div
      className="multiSelect"
      aria-label="multi-select-dropdown"
      ref={multiSelectRef}
    >
      <div
        className="multiSelect-input"
        aria-label="multi-select-input"
        onClick={() => {
          if (data?.count >= 0) {
            setShow(true);
          }
        }}
      >
        {selectedValue ? (
          <div className="multiSelect-values">{selectedValue}</div>
        ) : (
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            aria-label="multi-select-search"
          />
        )}
      </div>

      {show && (
        <MultiSelectOptions
          isLoading={isLoading}
          count={data?.count}
          options={data?.entries}
          onClick={handleOnSelect}
          selectedValue={selectedValue}
        />
      )}
    </div>
  );
}

export default MultiSelect;
