import React, {useState, setState, useEffect} from "react";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import Error from "./components/Error";
import axios from "axios"
import bcryptjs from "bcryptjs"

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


function App() {

  const adminUser = {
    name: "Andrei Shingirii",
    email: "admin@admin.com",
    password:"password"
  }

  const saltRounds = 10;

  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");
  const [isShown, setIsShown] = useState(false);
  

  const Login = details => {

    axios.get('api/database/read')
    .then(response => {
      try{
        let fetched_password = response.data.find(x => x.email === details.email).password;
        if ((details.email === adminUser.email && details.password === adminUser.password) || (bcryptjs.compareSync(details.password, fetched_password))){
          setUser({
            name: details.name,
            email: details.email
          });
        } else {
          setError("Credentials do not match");
        }
      } catch (exception){
          setError("User not found");
      }
    })
    .catch( error => {
      console.log(error);
    })
  }
 
  const Register = details => {

    if (details.name.length === 0 || details.email.length === 0 || details.password.length === 0){
      setError("Please fill all fields")
    } else {
      
      if (details.password.length < 6){
        setError("Password should contain at least 6 characters");
      } else {
        setError("");
        const salt = bcryptjs.genSaltSync(saltRounds);
        const hash = bcryptjs.hashSync(details.password, salt);
        details.password = hash;

        // SENDING DATA INTO THE DATABASE -> THE LAST STEP
        axios.post('api/database/create', details)
        .then(response => {
          console.log(response);
          if (response.data.slice(0,12) === "PDOException"){
            setError("This email is already registered");
          }
        })
        .catch( error => {
          console.log(error);
        })
      }
    }
  } 

  const Logout = () => {
    setUser({name:"", email:""});

  }

  const handleClick = event => {
    setIsShown(current => !current);
    setError("");
  };

  return (
    <React.Fragment>
      <button className='redirect' onClick={handleClick}>Click</button>
      {(isShown ? (
          (user.email !== "" ? (
            window.location.href = "/"
          ) : (
            <LoginForm Login={Login} error={error}  />
          )
        )
      ) : (
        <RegForm Register={Register} error={error} />
      )
      )}
     </React.Fragment>
  );
}

export default App;
