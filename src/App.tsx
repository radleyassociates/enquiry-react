import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { AssetAnalysisPage } from "./pages/AssetAnalysisPage";
import Header from "./shared/Header";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      {isAuthenticated && <Header logo="/logo-2.svg" />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/asset-analysis"
          element={
            <ProtectedRoute>
              <AssetAnalysisPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/asset-analysis" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;