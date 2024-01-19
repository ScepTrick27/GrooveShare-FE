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
import FollowingPage from '@/Pages/FollowingPage';
import RecommendedPosts from '@/Pages/RecommendedPosts'
import GetVerified from '@/Pages/GetVerified'
import AllVerifications from '@/Pages/AllVerifications'
import TokenManager from './services/TokenManager';
import { Link } from 'react-router-dom';

function App() {

  const claims = TokenManager.getClaims();
  function UserElement({ children }) {
      if (claims?.roles?.includes('USER')) {
          return children
      }
      else {
          return (
              <div className="access-denied">
                  <h1>You do not have access to this page!</h1>
                  <Link className="go-home" onClick={goHome} to="/"> Go back to home  </Link>
              </div>
          )
      }
  }

  function AdminPage({ children }) {
      if (claims?.roles?.includes('ADMIN')) {
          return children
      }
      else {
          return (
              <div className="access-denied">
                  <h1>You do not have access to this page!</h1>
                  <Link className="go-home" onClick={goHome} to="/"> Go back to home  </Link>
              </div>
          )
      }
  }

  const goHome = () => {
      window.location.href = '/'
  }


  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/MyProfilePage" element={<MyProfilePage />}></Route>
          <Route path="/EditUserDetailsPage/:id" element={
          <UserElement>
            <EditUserDetailsPage />
          </UserElement>
          } />
          <Route path="/CreatePost" element={
              <UserElement>
                  <CreatePost />
              </UserElement>
          } />
          <Route path="/UserPage/:id" element={
                        <UserElement>
                                  <UserPage />
                    </UserElement>
                } />
          {/* <Route path="/ChatPage" element={<ChatPage />} /> */}
          <Route path="/Statistics" element={
                  <AdminPage>
                        <Statistics />
                  </AdminPage>
                      } />
          <Route path="/search" element={
                            <UserElement>
                            <AllUsers />
                      </UserElement>
          } /> 
          <Route path="/FollowingPage" element={
                                      <UserElement>
                                     <FollowingPage />
                                </UserElement>
          } /> 
          <Route path="/RecommendedPosts" element={
                    <UserElement>
                    <RecommendedPosts />
                  </UserElement>
          } /> 
          <Route path="/GetVerified" element={
                              <UserElement>
                                        <GetVerified />
                            </UserElement>
} /> 
          <Route path="/AllVerifications" element={
                            <AdminPage>
                            <AllVerifications />
                      </AdminPage>
          } /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;


