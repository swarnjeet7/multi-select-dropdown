import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Select from "../select";
import "./multiSelect.css";

let initialFlag = true;

function MultiSelect({ isCacheAble = true, fetchConfig }) {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (initialFlag) return;
    const url = fetchConfig.url.replace(fetchConfig.param, value);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.count) {
          setOptions(res.entries);
        } else {
          setOptions([]);
        }
      });
  }, [value]);

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
    <div className="multiSelect">
      <div className="multiSelect-input">
        {selectedValue ? (
          <div className="multiSelect-values">{selectedValue}</div>
        ) : (
          <input type="text" value={value} onChange={handleInputChange} />
        )}
      </div>
      {options.length ? (
        <div className="multiSelect-options">
          {options.map((option, i) => {
            const key = `${option.API}${i}`;
            return (
              <Select key={key} text={option.API} onClick={handleOnSelect} />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default MultiSelect;
