import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Candidates from "./pages/Candidates"; // 👈 novo
import Companies from "./pages/Companies";
import userStore from "./store/userStore";
import { setAuthToken } from "./api/axios";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!userStore.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  useEffect(() => {
    const token = userStore.token;
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <>
      {userStore.isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidates"
          element={
            <ProtectedRoute>
              <Candidates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default observer(App);
