import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";

import QuestionPage from "./components/QuestionPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/question" element={<QuestionPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
