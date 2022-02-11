import './App.css';
import Header from "./components/Header";
import TopicsNavbar from "./components/TopicsNavbar";
import Articles from "./components/Articles";
import ArticleDetail from "./components/ArticleDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/User";


function App() {
  console.log(window.sessionStorage.getItem('username'));

  return (
    <BrowserRouter>
      <UserProvider>
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
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
