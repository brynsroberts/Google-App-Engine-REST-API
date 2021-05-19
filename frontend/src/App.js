import "./App.css";
import Home from "./Home";
import UserInfo from "./UserInfo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {<Route path="/" exact render={() => <Home />} />}
          <Route path="/UserInfo/:token_id" children={<UserInfo />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
