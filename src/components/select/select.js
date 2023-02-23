import { useRef } from "react";
import "./select.css";

function Select({ text, onClick, isSelected }) {
  const inputRef = useRef(null);

  function handleClick() {
    onClick(text, inputRef.current.checked);
  }

  return (
    <div className="select" aria-label="multi-select">
      <label className="select-label">
        <input
          type="checkbox"
          ref={inputRef}
          onChange={handleClick}
          aria-label="multi-select-checkbox"
          checked={isSelected}
        />
        <span aria-label="multi-select-text">{text}</span>
      </label>
    </div>
  );
}

export default Select;
