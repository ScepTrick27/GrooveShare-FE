import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import SignUp from './Pages/SignUp';
import AllUsers from './Pages/AllUsers';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<AllUsers />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


