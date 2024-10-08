import { QueryClient, QueryClientProvider } from "react-query";

import QuestionPage from "./components/QuestionPage";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <QuestionPage />
      </QueryClientProvider>
    </>
  );
}

export default App;
