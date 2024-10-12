import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";

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

        <Outlet />

        {/* Footer */}
        <Footer />
      </main>
    </QueryClientProvider>
  );
}

export default App;
