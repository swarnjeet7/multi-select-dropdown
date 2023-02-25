import Select from "../select";

function MultiSelectOptions({
  isLoading,
  count,
  options,
  onClick,
  selectedValue,
}) {
  if (isLoading) {
    return <div className="mulit-select-loading">Loading...</div>;
  }
  if (count) {
    return options?.map((option, i) => {
      return (
        <Select
          key={`${option.API}${i}`}
          text={option.API}
          onClick={onClick}
          isSelected={selectedValue.includes(option.API)}
        />
      );
    });
  }
  if (count === 0) {
    return <div className="multi-select-not-found">No result found</div>;
  }
}

export default MultiSelectOptions;
