import React from 'react';
import './App.css';

import { 
  BrowserRouter as Router,
  Route, Link
} from "react-router-dom";

import StockPage from "./StockPage"

class App extends React.Component {

  render() {

    return (
      <div className="App">
        <h1>Let Fun Together ~!~</h1>

        <Router>
          <hr width="500" />
          <nav>
            <Link to="/">Home</Link> | &nbsp;
            <Link to="/contact">Contact Us</Link> | &nbsp;
          </nav>
          <hr width="500" />
          <Route exact path="/" component={ StockPage } />
        </Router>
      </div>
    );
  }
}

export default App;
