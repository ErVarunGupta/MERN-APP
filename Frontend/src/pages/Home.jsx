import React, { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home(){
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() =>{
        //get the loggedInUser from localStorage and set it to state
        setLoggedInUser(localStorage.getItem('loggedInUser'));

    },[]);

    const handleLogout = (e) =>{
        e.preventDefault();
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('token');
        handleSuccess('Logout successful');
        setTimeout(() => {
            navigate('/login')
        }, 1000);
    }

    const fetchProducts = async() =>{
        try{
            const url = "http://localhost:8080/products/";

            const headers = {
                headers : {
                    'Authorization': localStorage.getItem('token'),
                }
            }
            const response = await fetch(url, headers); 
            const result = await response.json();
            console.log("result : ",result);
            setProducts(result);
            
        }catch(err){
            handleError(err);
        }
    }

    useEffect(() =>{
        fetchProducts();
    },[]);

    return(
        <div>
            <h1>{loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>

            <div>
                {
                    products && products?.map((item, index) =>(
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))
                }
            </div>

            {/* //for handleSuccess and handleError show */}
            <ToastContainer/> 
        </div>
    )
}

export default Home;