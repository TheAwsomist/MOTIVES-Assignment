import HomePage from "./pages/HomePage";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EventsPage from "./pages/EventsPage";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage/>
          </Route>
          <Route exact path="/:pathId">
            <EventsPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
