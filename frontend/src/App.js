import "./App.css";
import Home from "./Home";
import UserInfo from "./UserInfo";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          {<Route path="/" exact render={() => <Home />} />}
          <Route path="/UserInfo/:token_id" children={<UserInfo />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
