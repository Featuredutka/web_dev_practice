import React, {useState} from 'react'

function LoginForm({Login, error}) {
    const [details, setDetails] = useState({name: "", email: "", password:""});
    const submitHandler = e => {
        e.preventDefault();
        Login(details);
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
                    <a className='redirect' href="http://127.0.0.1:8000/register" to="/register">I don't have an account</a>
                    {/* <button type='test' color="red" onClick={SwitchView} text="Call Component"/>  */}
                    </div>
            </div>
        </form>
    </div>
  )
}

export default LoginForm