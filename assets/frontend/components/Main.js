import React, {useState} from 'react'
import axios from "axios"
import LoginForm from './LoginForm';

function Main({Logout, user}) {

  const [dispname, setDispName] = useState("");
  const [dispmail, setDispMail] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    Logout();
}

// axios.get('api/database/get_credentials')
// .then(response => {
//   console.log(response.data.name);
//   setDispName(response.data.name);
//   setDispMail(response.data.email);
// })

// function exit(){
//   Logout();
// }
// let username = response.data.name;
// let email = response.data.name;


return (
  <div className="App">
    <form onSubmit={submitHandler}>
          <div className='form-inner'>
              <h2>MAIN PAGE</h2>
              <label>You are logged in as - </label><h3>{user.name}</h3>
              <label>Your email is - </label><h3>{user.email}</h3>
              <input type="submit" value="LOGOUT"/>
          </div>
      </form>
  </div>
)
}

export default Main