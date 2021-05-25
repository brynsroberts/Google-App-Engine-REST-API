import "./App.css";
import Home from "./Home";
import UserInfo from "./Authentication";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Authentication from "./Authentication";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          {<Route path="/" exact render={() => <Home />} />}
          <Route path="/UserInfo" children={<UserInfo />} />
          <Route path="/authentication" children={<Authentication />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
