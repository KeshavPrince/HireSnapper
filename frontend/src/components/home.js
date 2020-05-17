import React, { Component } from "react";
import NavBar from "./navbar";
import { getFromStorage } from "../utils/storage";
import { verifyToken } from "../utils/verify_token";

class home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: "",
      isSignedIn: false,
      isError: false,
    };
  }

  componentDidMount() {
    let value = getFromStorage("HireSnapper_token");
    if (value) {
      if(verifyToken(value)) {
        console.log('ds');
        this.setState({
          isLoading : false,
          token : value,
          isSignedIn : true,
        });
      }
      else {
        console.log('Wolf is here1');   
      }
    }
    else {
      console.log('No Such Token Exist');
    }
  }

  render() {
    if(this.state.isLoading) {
      return <h1>Thala</h1>;
    } else {
      return (
        <div>
          <div className="header">
            <NavBar type={this.state.isSignedIn} />
          </div>
        </div>
      );
    }
  }
}

export default home;
