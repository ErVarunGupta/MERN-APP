import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';

function Signup(){

    const [signupInfo,  setSignupInfo] = useState({
        name: '',
        email: '',
        password:''
    })

    const navigate = useNavigate();

    const headleChange = (e)=>{
       const {name, value} = e.target;
       const copySignupInfo = {...signupInfo}
       copySignupInfo[name] = value;
       setSignupInfo(copySignupInfo);
    }

    // console.log('signupInfo -> ', signupInfo);

    const handleSignup = async (e)=>{
        e.preventDefault();
        const {name, email, password} = signupInfo;
        if(!name|| !email|| !password){//utils.js for success or error use toastify
            return handleError("name, email and password are required")
        }

        try{//api access form backend 
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json();
            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
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
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={headleChange}
                        type="text" 
                        name='name'
                        autoFocus
                        placeholder='Enter your name'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={headleChange}
                        type="email" 
                        name='email'
                        placeholder='Enter your email'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={headleChange}
                        type="password" 
                        name='password'
                        placeholder='Enter your password'
                        value={signupInfo.password}
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>
                    Already have an account ?
                    <a href="/login">Login</a>
                    {/* <Link to="/login">Login</Link> */}
                </span>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Signup;