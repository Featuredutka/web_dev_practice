import React, {useState} from 'react'

function Restoration({Restore, toggleRestore, error}) {
    const [details, setDetails] = useState({email: "", confirm_password: "", password:""});
    const submitHandler = e => {
        e.preventDefault();
        Restore(details);
    }
    const loginredirect = e =>{
        e.preventDefault();
        toggleRestore();
    }
  return (
    <div className="App">
        <form onSubmit={submitHandler}>
            <div className='form-inner'>
                <h2>Restore access</h2>
                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input 
                        type="email" 
                        name='email' 
                        id='email'
                        onChange={e => setDetails({...details, email: e.target.value})} 
                        value={details.email}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>New Password:</label>
                    <input 
                        type="password" 
                        name='password'
                        id='password'
                        onChange={e => setDetails({...details, password: e.target.value})} 
                        value={details.password}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='confirm_password'>Confirm Password:</label>
                    <input 
                        type="password" 
                        name='password'
                        id='password'
                        onChange={e => setDetails({...details, confirm_password: e.target.value})} 
                        value={details.confirm_password}/>
                </div>
                {(error !== "") ? (<div className='error'>{error}</div>) : ""} 
                <input type="submit" value="UPDATE"/>
                {/* <a className='redirect' href="http://127.0.0.1:8000/register" to="/register">Back to Login</a> */}
                <a className='redirect-restore' onClick={loginredirect}>Back to logging in</a>
            </div>
        </form>
    </div>
  )
}

export default Restoration