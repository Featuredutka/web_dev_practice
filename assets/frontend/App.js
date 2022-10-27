import React, {useState, setState, useEffect} from "react";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import Restoration from "./components/Restoration";
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
  const [warning, setWarning] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [activeView, setactiveView] = useState(false);
  

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
            details.password="";
          }
        })
        .catch( error => {
          console.log(error);
        })
      }
    }
  } 

  const Restore = details => {
    if (details.confirm_password.length === 0 || details.email.length === 0 || details.password.length === 0){
      setError("Please fill all fields")
    } else {
        if (details.password.length < 6 || details.confirm_password.length < 6){
          setError("Password should contain at least 6 characters");
        } else {
            if (details.password !== details.confirm_password){
              setError("Passwords do not match");
              details.password="";
              details.confirm_password=""
            } else {
                setError("");
                const salt = bcryptjs.genSaltSync(saltRounds);
                const hash = bcryptjs.hashSync(details.password, salt);
                details.password = hash;
                

           // SENDING DATA INTO THE DATABASE -> THE LAST STEP
           let generated = Math.floor((Math.random()*10000000)+12345678)
           const new_hash = bcryptjs.hashSync(generated.toString(), salt);
           details.confirm_password = new_hash;

           axios.put('api/database/update', details)
           .then(response => {
             console.log(response.data);
             setWarning("Verification email sent");
           })
           .catch( error => {
             console.log(error);
             if (error.message.slice(-3) === "500"){
              setError("This email is not registered");
              details.password="";
              details.confirm_password=""
            }
           })
              }
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

  const toggleViewRestore = event => {
    setactiveView(current => !current);
    setError("");
  }
  
  const sendEmail = details => {
    axios.post("api/database/mail_confirmation", { hello: 'world' })
    .then(response => {
      console.log(response.data);
    })
    .catch( error => {
      console.log(error);
     })
  }


  return (
    <React.Fragment>
      {/* <button className='redirect' onClick={sendEmail}>SAMPLE EMAIL</button> */}
      {/* <button className='redirect' onClick={toggleViewRestore}>Toggle "Restore Password" view</button> */}
      {/* <div className="form-inner">
        <h2>You are currently logged in as </h2> {user.email}
        </div> */}


      {
      (activeView ? (
        <Restoration Restore={Restore} toggleRestore={toggleViewRestore} warning={warning} error={error}  />
      ) : (
        (isShown ? (
          (user.email !== "" ? (
            window.location.href = "/"
            // <LoginForm Login={Login} handleClick={handleClick} toggleRestore={toggleViewRestore} error={error}  />
          ) : (
            <LoginForm Login={Login} handleClick={handleClick} toggleRestore={toggleViewRestore} error={error}  />
          )
        )
        ) : (
        <RegForm Register={Register} handleClick={handleClick} error={error} />
        )
        )
      )
      )
      }
     </React.Fragment>
  );
}

export default App;
