import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/Navbar";
import DetailsPage from "./pages/DetailsPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/product/:id" element={<DetailsPage />} />
        <Route path="/cartPage" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
