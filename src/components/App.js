import React from 'react';
import './App.scss';

import { 
  BrowserRouter as Router,
  Route, Link
} from "react-router-dom";

import StockPage from "./StockPage";
import History from "./History";

class App extends React.Component {
  render() {

    return (
      <div className="App">

        <Router>
          <hr width="500" />
          <nav>
            <Link to="/">Home</Link> | &nbsp;
            <Link to="/history">History</Link>
          </nav>
          <hr width="500" />
          <Route exact path="/" component={ StockPage } />
          <Route exact path="/history" component={ History } />
        </Router>
      </div>
    );
  }
}

export default App;
