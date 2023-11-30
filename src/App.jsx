import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import SignUp from './Pages/SignUp';
import AllPosts from './Pages/AllPosts';
import LogIn from './Pages/LogIn';
import NavBar from './components/NavBar';
import MyProfilePage from './Pages/MyProfilePage'
import EditUserDetailsPage from './Pages/EditUserDetailsPage'
import CreatePost from './Pages/CreatePost';
import AllUsers from './Pages/AllUsers'
import UserPage from './Pages/UserPage';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/MyProfilePage" element={<MyProfilePage />} />
          <Route path="/EditUserDetailsPage/:id" element={<EditUserDetailsPage />} />
          <Route path="/CreatePost" element={<CreatePost />} />
          <Route path="/AllUsers" element={<AllUsers />} />
          <Route path="/UserPage/:id" element={<UserPage />} />
          <Route path="/ChatPage" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


