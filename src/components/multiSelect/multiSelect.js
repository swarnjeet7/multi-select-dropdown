import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Select from "../select";
import "./multiSelect.css";

let initialFlag = true;

function MultiSelect({
  isCacheAble = true,
  fetchConfig,
  selectedValue,
  setSelectedValue,
}) {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialFlag) return;
    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const url = fetchConfig.url.replace(fetchConfig.param, value);
    fetch(url, { signal })
      .then((res) => res.json())
      .then((res) => {
        if (res.count) {
          setOptions(res.entries);
        } else {
          setOptions([]);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [value, fetchConfig.param, fetchConfig.url]);

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
    initialFlag = false;
    setValue(event.target.value);
  }

  return (
    <div className="multiSelect" aria-label="multi-select-dropdown">
      <div className="multiSelect-input" aria-label="multi-select-input">
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
      <div className="multiSelect-options" aria-label="multi-select-options">
        {isLoading ? (
          <div className="mulitSelect-loading">Loading...</div>
        ) : options.length ? (
          options.map((option, i) => {
            const key = `${option.API}${i}`;
            return (
              <Select key={key} text={option.API} onClick={handleOnSelect} />
            );
          })
        ) : null}
      </div>
    </div>
  );
}

export default MultiSelect;
