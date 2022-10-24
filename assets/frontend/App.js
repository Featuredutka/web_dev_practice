import React, {useState, setState, useEffect} from "react";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import Home from "./components/Home";
import Error from "./components/Error";
import axios from "axios"

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


function App() {

  const adminUser = {
    name: "Andrei Shingirii",
    email: "admin@admin.com",
    password:"password"
  }

  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(0);


  // function readDB(){
  //   let test = axios.get('api/database/read')
  //   .then(response => {
  //     console.log('success');
  //     return response.data;
  //   }).catch( error => {
  //     console.log(error);
  //   })
  //   return test;
  // }

  const Login = details => {

    // console.log(details);

    // let database = new Object;

    // database = readDB();

    // database.then((v) => {
    //   console.log(
    //     // v[0].id
    //     v.find(x => x.name === details.email).id
    //     );
    // });

    // database.then((v) => {
    //   let tmp_confirmation = v.find(x => x.name === details.email).id;
    //   // console.log(tmp_confirmation);
    //   setConfirmation(tmp_confirmation);
    // });

    // useEffect(() => {
    //   console.log(confirmation); 
    // });

    axios.get('api/database/read')
    .then(response => {

      console.log('success');
      let tmp_confirmation = response.data.find(x => x.name === details.email).id;
      // console.log(tmp_confirmation);
      // setConfirmation(tmp_confirmation);

      if ((details.email === adminUser.email && details.password === adminUser.password) || (details.password == tmp_confirmation)){
        console.log("LOGGED IN SUCCESSFULLY");
        setUser({
          name: details.name,
          email: details.email
        });
      } else {
        console.log("CREDENTIALS ARE NOT CORRECT");
        setError("Credentials do not match");
      }
    })
    .catch( error => {
      console.log(error);
    })

    // if (confirmation != 0){
    //   console.log(confirmation);
    // } else {
    //   console.log('empty');
    // }
    
    // if (details.email === adminUser.email && details.password === adminUser.password){
    //   console.log("LOGGED IN SUCCESSFULLY");
    //   setUser({
    //     name: details.name,
    //     email: details.email
    //   });
    // } else {
    //   console.log("CREDENTIALS ARE NOT CORRECT");
    //   setError("Credentials do not match");
    // }
  } 

  const Register = details => {
    console.log(details);
    axios.post('api/database/create', details)
    .then(response => {
      console.log(response.data);
    })
    .catch( error => {
      console.log(error);
    })
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

  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };


  return (
    <React.Fragment>
      <button onClick={handleClick}>Click</button>
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
{/* 
      {(user.email !== "" ? (
          window.location.href = "/"
        ) : (
          <LoginForm Login={Login} error={error}  />
        )
      )} */}

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
