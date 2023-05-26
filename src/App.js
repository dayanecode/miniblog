import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// mapeia se a autenticação foi realizada com sucesso
import { onAuthStateChanged } from 'firebase/auth';

// hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

// context
import { AuthProvider } from './context/AuthContext';

// pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import EditPost from './pages/EditPost/EditPost';

// components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'
import ChooseAvatar from './components/ChooseAvatar/ChooseAvatar';
import ShowUserAvatar from './components/ShowUserAvatar/ShowUserAvatar';

function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()


  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              {/* Rotas Públicas */}
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/about'
                element={<About />}
              />
              <Route
                path='/search'
                element={<Search />}
              />
              <Route
                path='/posts/:id'
                element={<Post />}
              />
               <Route
                path='/choose-avatar'
                element={<ChooseAvatar />}
              />
              {/* Rotas Privadas */}
              <Route
                path='/login'
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path='/register'
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path='/posts/edit/:id'
                element={user ? <EditPost /> : <Navigate to="/login" />}
              />
              <Route
                path='/posts/create'
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />
              <Route
                path='/dashboard'
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path='/show-avatar'
                element={user ? <ShowUserAvatar /> : <Navigate to="/login" />}
              />
            </Routes >
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
