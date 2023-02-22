import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import Select from "./index";

const defaultProps = {
  text: "Cat Fat",
  onClick: jest.fn(),
};

const setup = () => {
  const utils = render(<Select {...defaultProps} />);
  const selectBox = screen.getByLabelText("multi-select");
  const checkbox = screen.getByLabelText("multi-select-checkbox");
  const text = screen.getByText("Cat Fat");
  return {
    selectBox,
    text,
    checkbox,
    ...utils,
  };
};

test("it should render properly", () => {
  const { selectBox, text, checkbox } = setup();
  expect(selectBox).toBeInTheDocument();
  expect(text).toBeInTheDocument();
  expect(checkbox).toBeInTheDocument();
});

test("it should handle on click", () => {
  const { selectBox, text, checkbox } = setup();
  expect(selectBox).toBeInTheDocument();
  expect(text).toBeInTheDocument();
  expect(checkbox).toBeInTheDocument();
  fireEvent.click(checkbox);
  expect(checkbox.checked).toEqual(true);
  fireEvent.click(checkbox);
  expect(checkbox.checked).toEqual(false);
});
