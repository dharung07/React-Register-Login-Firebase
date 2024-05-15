import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationContainer from "./components/Registration-container";
import HomePage from "./components/Home";
import LoginContainer from "./components/Login-container";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationContainer />} />
          <Route path="/login" element={<LoginContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
