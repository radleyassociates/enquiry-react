import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./shared/Header";
import { useAuth } from "./contexts/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { AssetsSummary } from "./pages/AssetsSummary";
import { AssetEnquiryView } from "./pages/AssetDetailPage";
import logo from './assets/logo-2.svg';

function App() {
  const { isAuthenticated } = useAuth();

  const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      {isAuthenticated && <Header logo={logo} />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <AssetsSummary />
            </ProtectedRoute>
          }
        />
        <Route path="/asset-analysis/:enquiryId"
          element={
            <ProtectedRoute>
              <AssetEnquiryView />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/assets" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;