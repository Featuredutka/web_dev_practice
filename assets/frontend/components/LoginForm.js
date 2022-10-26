import React, {useState} from 'react'


function LoginForm({Login, handleClick, toggleRestore, error}) {
    const [details, setDetails] = useState({name: "", email: "", password:""});
    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }
    const registerredirect = e =>{
        e.preventDefault();
        handleClick();
    }
    const restoreredirect = e =>{
        e.preventDefault();
        toggleRestore();
    }
  return (
    <div className="App">
        <form onSubmit={submitHandler}>
            <div className='form-inner'>
                <h2>Login</h2>
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
                    <label htmlFor='password'>Password:</label>
                    <input 
                        type="password" 
                        name='password'
                        id='password'
                        onChange={e => setDetails({...details, password: e.target.value})} 
                        value={details.password}/>
                </div>
                {(error !== "") ? (<div className='error'>{error}</div>) : ""}
                
                <div>
                    <input type="submit" value="LOG IN"/>
                    {/* <input type="reset" value="I don't have an account"/> */}
                    <a className='redirect' onClick={registerredirect}>I don't have an account</a>
                    <a className='redirect-restore' onClick={restoreredirect}>I forgot my password</a>
                    {/* <button type='test' color="red" onClick={toggleViewRestore} text="Call Component"/>  */}
                    </div>
            </div>
        </form>
    </div>
  )
}

export default LoginForm