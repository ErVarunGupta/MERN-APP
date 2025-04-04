import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';

function Login(){

    const [loginInfo,  setLoginInfo] = useState({
        email: '',
        password:''
    })

    const navigate = useNavigate();

    const headleChange = (e)=>{
       const {name, value} = e.target;
       const copyloginInfo = {...loginInfo}
       copyloginInfo[name] = value;
       setLoginInfo(copyloginInfo);
    }

    // console.log('loginInfo -> ', loginInfo);

    const handleLogin = async (e)=>{
        e.preventDefault();
        const {email, password} = loginInfo;
        if(!email|| !password){//utils.js for success or error use toastify
            return handleError("email and password are required")
        }

        try{//api access form backend 
            const url = "http://localhost:8080/auth/Login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(loginInfo)
            })
            const result = await response.json();
            const {success, message,jwtToken, name, error} = result;
            if(success){
                handleSuccess(message);
                //for display on home page 
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                
                setTimeout(()=>{
                    navigate('/home')
                },1000);
            }else if(error){
                const details = error.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
            console.log(result);
        }catch(err){
            handleError(err);
        }

    }

    
    return(
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={headleChange}
                        type="email" 
                        name='email'
                        placeholder='Enter your email'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={headleChange}
                        type="password" 
                        name='password'
                        placeholder='Enter your password'
                        value={loginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button>
                <span>
                    Does't have an account?
                    <a href="/signup">Signup</a>
                    {/* <Link to="/login">Login</Link> */}
                </span>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Login;