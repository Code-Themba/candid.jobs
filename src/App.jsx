import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <div className="cj-root">
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  );
};

export default App;
