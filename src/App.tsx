import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import CustomAIPage from "./pages/CustomAIPage";
import InquiryPage from "./pages/InquiryPage";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/services" element={<ServicesPage/>}/>
          <Route path="/custom-ai" element={<CustomAIPage/>}/>
          <Route path="/inquiry" element={<InquiryPage/>}/>
          <Route path="/privacy" element={<Privacy/>}/>
          <Route path="/terms" element={<Terms/>}/>
          <Route/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;