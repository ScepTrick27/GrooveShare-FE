import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import SignUp from './Pages/SignUp';
import AllUsers from './Pages/AllUsers';
import LogIn from './Pages/LogIn';
import NavBar from './components/NavBar';
import MyProfilePage from './Pages/MyProfilePage'
import EditUserDetailsPage from './Pages/EditUserDetailsPage'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<AllUsers />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/MyProfilePage" element={<MyProfilePage />} />
          <Route path="/EditUserDetailsPage/:id" element={<EditUserDetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


