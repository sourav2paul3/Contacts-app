import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar, ContactList } from "./components";
import { ContactProvider } from "./context/ContactContext";

function App() {
  return (
    <ContactProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="*" element={<Navigate to="/contacts" />} />
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<ContactList />} />
        </Routes>
      </BrowserRouter>
    </ContactProvider>
  );
}

export default App;
