import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Customer from "./pages/Customer";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter basename={"/customer"}>
        <Routes>
          <Route path="/" element={<Customer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
