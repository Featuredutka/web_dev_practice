import React, {useState} from "react";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import Home from "./components/Home";
import Error from "./components/Error";


import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {

  const adminUser = {
    name: "Andrei Shingirii",
    email: "admin@admin.com",
    password:"password"
  }

  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if (details.email === adminUser.email && details.password === adminUser.password){
      console.log("LOGGED IN SUCCESSFULLY");
      setUser({
        name: details.name,
        email: details.email
      });
    } else {
      console.log("CREDENTIALS ARE NOT CORRECT");
      setError("Credentials do not match");
    }
  } 

  const Register = details => {
    console.log(details);
    // regUser({
    //   name: details.name, 
    //   email: details.email,
    //   password: details.password})

    // plainUser.name = details.name;
    // plainUser.email = details.email;
    // plainUser.password = details.password;
    // console.log(plainUser);
    // setUser({
    //   name: details.name,
    //   email: details.email,
    //   password: details.password
    // });
  } 

  const Logout = () => {
    setUser({name:"", email:""});

  }

  return (
    <React.Fragment>
      {(user.email !== "" ? (
          window.location.href = "/"
      ) : (
          <LoginForm Login={Login} error={error}  />
      )
      )}

    {/* <h1>Homepage</h1>
    <div className="App">
      
      
    </div> */}
    {/* </React.Fragment>
    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/frontend" 
    element=/>
    <Route path="/register"
     element={<RegForm Register={Register} error={error}  />}/>
    <Route path="*" element={<Error />}/>
    </Routes>
    </Router> */}
     </React.Fragment>
  );
}

export default App;
