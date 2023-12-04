import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      {/* Rendering the actual page here */}
      <body>
        <div className="App">
          <div id="page-body">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/articles" element={<ArticlesListPage />} />
              <Route path="/articles/:articleId" element={<ArticlePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create-account" element={<CreateAccountPage />} />
              {/* Asterix to match everything else than the above */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </body>
    </BrowserRouter>
  );
}

export default App;
