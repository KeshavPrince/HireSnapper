import React, { useState, useEffect } from "react";
import NavBar from "./navbar";
import { getFromStorage } from "../utils/storage";
import { verifyToken } from "../utils/apicalls";

export default function Home() {
  
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    let value = getFromStorage("HireSnapper_token");
    if (value) {
      let res = false;
      res = await verifyToken(value).catch(err => res = false);  
      if(res) {
          setIsLoading(false);
          setIsSignedIn(true);
      }
      else {
        setIsLoading(false);
      }
    }
    else {
      setIsLoading(false);
      console.log('No Such Token Exist');
    }
   }

  useEffect(() => {
     init();
  }, []);
  if(isLoading)
  {
    return (<div className="header"></div>);
  }
  else
  {
   return ( <div>
    <div className="header">
      <NavBar type={isSignedIn} />
    </div>
  </div>);
  }
  }