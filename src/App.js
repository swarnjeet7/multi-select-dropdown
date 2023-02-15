import MultiSelect from "./components/multiSelect/multiSelect";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <MultiSelect
          isCacheAble={false}
          fetchConfig={{
            url: `https://api.publicapis.org/entries?title=<title>`,
            param: "<title>",
          }}
        ></MultiSelect>
      </div>
    </QueryClientProvider>
  );
}

export default App;
