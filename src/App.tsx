import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import CustomAIPage from "./pages/CustomAIPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/services" element={<ServicesPage/>}/>
          <Route path="/custom-ai" element={<CustomAIPage/>}/>
          <Route/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;