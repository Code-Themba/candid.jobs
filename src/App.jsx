// import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "./pages/LandingPage";
import AccountabilityPage from "./pages/AccountabilityPage";
import NotFoundPage from "./pages/NotFoundPage";
import ApplicationDashboard from "./components/Seeker/ApplicationDashboard";
const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route
          path="employers/accountability"
          element={<AccountabilityPage />}
        />
        <Route path="seekers/dashboard" element={<ApplicationDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
