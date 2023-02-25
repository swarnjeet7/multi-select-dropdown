import { useState } from "react";
import MultiSelect from "./components/multiSelect/multiSelect";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div style={{ margin: "0 0 20px" }} data-testid="selected-values">
          <strong>Selected Value:</strong> {selectedValue}
        </div>
        <MultiSelect
          isCacheAble={false}
          url="https://api.publicapis.org/entries?title="
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        ></MultiSelect>
      </div>
    </QueryClientProvider>
  );
}

export default App;
