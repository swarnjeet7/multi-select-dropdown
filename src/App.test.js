import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  screen,
  render,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import App from "./App";

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

test("renders app", async () => {
  render(<App />);
  const input = screen.getByLabelText("multi-select-search");
  fireEvent.change(input, { target: { value: "cat" } });
  expect(input.value).toBe("cat");
  await waitFor(() => screen.findByText("Cat Facts"));
  const selectedElement = screen.getByText("Cat Facts");
  fireEvent.click(selectedElement);
  const { getByText } = within(screen.getByTestId("selected-values"));
  expect(getByText("Cat Facts")).toBeInTheDocument();
});
