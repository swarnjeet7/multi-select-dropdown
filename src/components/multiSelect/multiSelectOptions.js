import Select from "../select";

function MultiSelectOptions({
  isLoading,
  count,
  options,
  onClick,
  selectedValue,
}) {
  if (isLoading) {
    return (
      <div className="multiSelect-options" aria-label="multi-select-options">
        <div className="mulitSelect-loading">Loading...</div>
      </div>
    );
  }
  if (count) {
    return (
      <div className="multiSelect-options" aria-label="multi-select-options">
        {options?.map((option, i) => {
          return (
            <Select
              key={`${option.API}${i}`}
              text={option.API}
              onClick={onClick}
              isSelected={selectedValue.includes(option.API)}
            />
          );
        })}
      </div>
    );
  }
  if (count === 0) {
    return (
      <div className="multiSelect-options" aria-label="multi-select-options">
        <div className="mulitSelect-loading">No result found</div>
      </div>
    );
  }
}

export default MultiSelectOptions;
