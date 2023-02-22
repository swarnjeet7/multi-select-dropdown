import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import MultiSelect from "./index";

const defaultProps = {
  fetchConfig: {
    url: `https://api.publicapis.org/entries?title=<title>`,
    param: "<title>",
  },
  selectedValue: "",
  setSelectedValue: jest.fn(),
};

const setup = () => {
  const utils = render(<MultiSelect {...defaultProps} />);
  const input = screen.getByLabelText("multi-select-search");
  return {
    input,
    ...utils,
  };
};

const server = setupServer(
  rest.get("https://api.publicapis.org/entries", (req, res, ctx) => {
    return res(
      ctx.json({
        count: 3,
        entries: [
          {
            API: "Cat Facts",
            Description: "Daily cat facts",
            Auth: "",
            HTTPS: true,
            Cors: "no",
            Link: "https://alexwohlbruck.github.io/cat-facts/",
            Category: "Animals",
          },
          {
            API: "Cataas",
            Description: "Cat as a service (cats pictures and gifs)",
            Auth: "",
            HTTPS: true,
            Cors: "no",
            Link: "https://cataas.com/",
            Category: "Animals",
          },
          {
            API: "Cats",
            Description: "Pictures of cats from Tumblr",
            Auth: "apiKey",
            HTTPS: true,
            Cors: "no",
            Link: "https://docs.thecatapi.com/",
            Category: "Animals",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it should render properly", () => {
  const { input } = setup();
  expect(input).toBeInTheDocument();
});

test("it should handle the change input value", () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "cat" } });
  expect(input.value).toBe("cat");
});

test("it should open the dropdown and loading text should display", () => {
  const { input } = setup();
  const loadingElement = screen.getByText("Loading...");
  fireEvent.change(input, { target: { value: "dog" } });
  expect(input.value).toBe("dog");
  expect(loadingElement).toBeInTheDocument();
});

test("it should open the dropdown and should display search items", async () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "cat" } });
  expect(input.value).toBe("cat");

  await waitFor(() => screen.findByText("Cat Facts"));
  const selectElement = screen.getByText("Cat Facts");
  expect(selectElement).toBeInTheDocument();
});
