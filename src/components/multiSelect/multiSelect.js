import { useState, useEffect, useRef } from "react";
import MultiSelectDropdown from "./multiSelectDropdown";
import "./multiSelect.css";

function MultiSelect({
  isCacheAble = true,
  fetchConfig,
  selectedValue,
  setSelectedValue,
  url,
}) {
  const multiSelectRef = useRef(null);
  const [show, setShow] = useState(false);

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

  return (
    <div
      className="multi-select"
      aria-label="multi-select-dropdown"
      ref={multiSelectRef}
    >
      <div
        className="multi-select-values"
        aria-label="multi-select-select"
        onClick={() => {
          setShow((prevState) => !prevState);
        }}
      >
        {selectedValue ? selectedValue : "Please select"}
      </div>

      {show && (
        <MultiSelectDropdown
          url={url}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      )}
    </div>
  );
}

export default MultiSelect;
