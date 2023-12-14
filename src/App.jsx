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
import Statistics from './Pages/Statistics'
import SearchResultPage from './Pages/AllUsers';
import FollowingPage from '@/Pages/FollowingPage'

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
          <Route path="/UserPage/:id" element={<UserPage />} />
          <Route path="/ChatPage" element={<ChatPage />} />
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/search" element={<AllUsers />} /> 
          <Route path="/FollowingPage" element={<FollowingPage />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;


