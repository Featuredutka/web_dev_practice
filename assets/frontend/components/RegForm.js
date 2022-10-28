import React, {useState} from 'react'

function RegForm({Register, handleClick, warning, error}) {
    const [details, setDetails] = useState({name: "", email: "", password:""});

    const submitHandler = e => {
        e.preventDefault();
        Register(details);
    }
    const loginredirect = e =>{
        e.preventDefault();
        handleClick();
    }
  return (
    <div className="App">
        <form onSubmit={submitHandler}>
            <div className='form-inner'>
                <h2>Register</h2>
                <div className='form-group'>
                    <label htmlFor='name'>Name:</label>
                    <input 
                        type="text" 
                        name='name' 
                        id='name' 
                        onChange={e => setDetails({...details, name: e.target.value})} 
                        value={details.name}/>
                </div>
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
                {(warning !== "") ? (<div className='warning'>{warning}</div>) : ""} 
                <input type="submit" value="SIGN UP"/>
                <a className='redirect-password' onClick={loginredirect}>I have an account</a>
            </div>
        </form>
    </div>
  )
}

export default RegForm