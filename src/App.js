import './App.css';
import { useState } from "react";
import Header from "./components/Header";
import TopicsNavbar from "./components/TopicsNavbar";
import Articles from "./components/Articles";
import ArticleDetail from "./components/ArticleDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/User";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser, isLoggedIn, setIsLoggedIn }}>
        <div className="App">
          <Header></Header>
          <section className='App_mainsection'>
            <TopicsNavbar></TopicsNavbar>
            <Routes>
              <Route path="/" element={<Articles></Articles>}></Route>
              <Route path="/articles" element={<Articles></Articles>}></Route>
              <Route path="/articles/:article_id" element={<ArticleDetail></ArticleDetail>}></Route>
            </Routes>
          </section>
        </div>
      </UserContext.Provider>
    </BrowserRouter>

  );
}

export default App;
