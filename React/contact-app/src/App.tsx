import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar, ContactCard, ContactList } from "./components";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ContactList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
