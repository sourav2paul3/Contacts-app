import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar, ContactList, ContactDetails } from "./components";
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
          <Route path="/contact/:id" element={<ContactDetails />} />
        </Routes>
      </BrowserRouter>
    </ContactProvider>
  );
}

export default App;
