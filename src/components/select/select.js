import { useRef } from "react";
import "./select.css";

function Select({ text, onClick }) {
  const inputRef = useRef(null);

  function handleClick() {
    onClick(text, inputRef.current.checked);
  }

  return (
    <div className="select">
      <label className="select-label">
        <input type="checkbox" ref={inputRef} onClick={handleClick} />
        <span>{text}</span>
      </label>
    </div>
  );
}

export default Select;
