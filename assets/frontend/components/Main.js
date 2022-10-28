import React, {useState} from 'react'

function Main({Logout, user}) {

  const submitHandler = e => {
    e.preventDefault();
    Logout();
}

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