import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar, ContactList } from "./components";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="*" element={<Navigate to="/contacts" />} />
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<ContactList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
