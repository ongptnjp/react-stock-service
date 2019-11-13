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
          <div className="navbar">
            <Link to="/" className="navbar-title">Home</Link>
            <Link to="/history" className="navbar-title">History</Link>
          </div>
          <Route exact path="/" component={ StockPage } />
          <Route exact path="/history" component={ History } />
        </Router>
      </div>
    );
  }
}

export default App;
