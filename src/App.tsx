import { Routes, Route, Navigate } from "react-router-dom";
import Tutorial_Page from "./Tutorial_Page";
import Dashboard from "./components/Dashboard";
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Tutorial_Page />} />

      {/* Redirect root → dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard route */}
      <Route
        path="/dashboard"
        element={
          <Dashboard
            userEmail="shivam@gmail.com"
            onLogout={() => console.log("logout")}
          />
        }
      />
    </Routes>
  );
}

export default App;
