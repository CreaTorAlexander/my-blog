import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar />
    {/* Rendering the actual page here */}
      <body>
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/about" element={<AboutPage />} />
            <Route path="/articles" element={<ArticlesListPage />} />
            <Route path="/articles/:articleId" element={<ArticlePage />} />
            {/* Asterix to match everything else than the above */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </body>
    </div>
    </BrowserRouter>
  );
}

export default App;

