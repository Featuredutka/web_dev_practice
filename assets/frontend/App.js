import React, {useState, setState, useEffect} from "react";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import Home from "./components/Home";
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

      // console.log(response);
      let fetched_password = response.data.find(x => x.email === details.email).password;
      // console.log(tmp_confirmation);
      // setConfirmation(tmp_confirmation);

      if ((details.email === adminUser.email && details.password === adminUser.password) || (bcryptjs.compareSync(details.password, fetched_password))){
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

    const salt = bcryptjs.genSaltSync(saltRounds);
    const hash = bcryptjs.hashSync(details.password, salt);
    details.password = hash;

    

    // SENDING DATA INTO THE DATABASE -> THE LAST STEP
    axios.post('api/database/create', details)
    .then(response => {
      console.log(response.data);
    })
    .catch( error => {
      console.log(error);
    })
  } 

  const Logout = () => {
    setUser({name:"", email:""});

  }

  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
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
