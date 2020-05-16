import React, { Component } from "react";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Home from "./components/home";
import './materialize.css'
import { Route, BrowserRouter } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <Route exact path="/" component={Home} />
          <Route path="/authenticate/signup" component={Signup} />
          <Route path="/authenticate/signin" component={Signin} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
