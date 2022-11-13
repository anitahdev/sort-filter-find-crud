import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NewUserPage } from "./pages/NewUserPage";
import UsersPage from "./pages/UsersPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/create" element={<NewUserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
