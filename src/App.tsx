import React from "react";
import "./App.css";
import DashboardPage from "./pages/admin/DashboardPage";
import BackToTop from "./components/backToTop";
const App: React.FC = () => {
  return (
    <>
      <DashboardPage />
      <BackToTop />
    </>
  );
};

export default App;
