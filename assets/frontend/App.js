import React, {useState, setState, useEffect} from "react";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import Restoration from "./components/Restoration";
import Main from "./components/Main";
import axios from "axios"
import bcryptjs from "bcryptjs"

function App() {

  const saltRounds = 10;  // Password hashing element

  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [isShown, setIsShown] = useState(true);
  const [activeView, setactiveView] = useState(false);
  const [auth, setAuth] = useState(false);
  
     
  const Login = details => {

    axios.get('api/database/read')
    .then(response => {
      try{
        let fetched_password = response.data.find(x => x.email === details.email).password;
        let username = response.data.find(x => x.email === details.email).name;
        if (bcryptjs.compareSync(details.password, fetched_password)){
          setUser({
            name: username,
            email: details.email
          });
          setAuth(true);
          // Set a cookie for a faster login after  
          details.password = fetched_password;
          details.name = username;
          axios.post('api/database/set_credentials', details)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          })
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
    setWarning("");
    setError("");
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

        // Sending data into the DB
        axios.post('api/database/create', details)
        .then(response => {
          console.log(response);
          if (response.data !== 200){
            setError("This email is already registered");
          } else {
            setWarning("User successfully registered");
          }
          details.password="";
        })
        .catch( error => {
          console.log(error);
        })
      }
    }
  } 

  const Restore = details => {
    setWarning("");
    setError("");
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
                
           // Sending data into the DB
           let generated = Math.floor((Math.random()*10000000)+12345678)
           const new_hash = bcryptjs.hashSync(generated.toString(), salt);
           details.confirm_password = new_hash;

           axios.put('api/database/update', details)
           .then(response => {
             console.log(response.data);
             setWarning("Verification email sent");
             details.password="";
             details.confirm_password=""
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
    axios.get('api/database/erase_credentials')
    .then(response => {
      console.log(response);
      setAuth(false);
    }
    );

  }

  const handleClick = event => {
    setIsShown(current => !current);
    setError("");
  };

  const toggleViewRestore = event => {
    setactiveView(current => !current);
    setError("");
  }

  async function getcookie () {
    axios.get('api/database/get_credentials')
    .then(data_from_kuki => {
      
      // Fetch password from cookie
      let fetched_password = data_from_kuki.data.password;
      
      // Check password with one that is written into the DB
      axios.get('api/database/read')
      .then(response => {
        let checkpass = response.data.find(x => x.email === data_from_kuki.data.email).password;
        console.log(checkpass === fetched_password);
        if(checkpass === fetched_password){
          setUser({
            name: data_from_kuki.data.name,
            email: data_from_kuki.data.email,
        })
          setAuth(true);
          // console.log("cookie passwords match");

        } else {
          // console.log("cookie passwords do not match");
        }
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  if (!auth){
    getcookie();
  }

  return ( 

    <React.Fragment> 
      {
      (activeView ? (
        <Restoration Restore={Restore} toggleRestore={toggleViewRestore} warning={warning} error={error}  />
      ) : (
        (isShown ? (
          (auth ? (
            <Main Logout={Logout} user={user}/>
          ) : (
            <LoginForm Login={Login} handleClick={handleClick} toggleRestore={toggleViewRestore} error={error}  />
            )
          )
        ) : (
        <RegForm Register={Register} handleClick={handleClick} warning={warning} error={error} />
        )
        )
      )
      )}
     </React.Fragment>
  );
}

export default App;
