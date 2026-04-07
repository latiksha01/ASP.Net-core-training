import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { EmployeeProvider } from "./context/EmployeeContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <EmployeeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />

              <Route path="/dashboard" element={
                <ProtectedRoute><Dashboard /></ProtectedRoute>
              } />

              <Route path="/analytics" element={
                <ProtectedRoute><Analytics /></ProtectedRoute>
              } />

              <Route path="/settings" element={
                <ProtectedRoute><Settings /></ProtectedRoute>
              } />
            </Routes>
          </BrowserRouter>
        </EmployeeProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;