import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";

import QuestionPage from "./pages/QuestionPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="h-screen w-full bg-white flex flex-col items-center justify-center">
        {/* Navbar */}
        <Navbar />

        {/* Background gradient */}
        <div className="absolute h-60 top-0 left-0 w-full bg-gradient-to-b from-blue-500/20 to-white" />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/question" element={<QuestionPage />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </main>
    </QueryClientProvider>
  );
}

export default App;
