import React from 'react';
import './App.scss';

import { 
  BrowserRouter as Router,
  Route, Link
} from "react-router-dom";

import StockPage from "./StockPage";
import FeedNews from "./FeedNews";

class App extends React.Component {
  render() {

    return (
      <div className="App">

        <Router>
          <div className="navbar">
            <Link to="/" className="navbar-title">Home</Link>
            <Link to="/history" className="navbar-title">News</Link>
          </div>
          <Route exact path="/" component={ StockPage } />
          <Route exact path="/history" component={ FeedNews } />
        </Router>
      </div>
    );
  }
}

export default App;
