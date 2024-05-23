import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function Login() {
    const [values, setValues] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate()
    function handleInput(e){
        setValues(prev => ({...prev, [e.target.name]: e.target.value }))
    }
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:3000')
        .then( res =>{
            if(res.data.Authorised){
                navigate('/')
            }else{
                navigate('/login')
            }
            console.log(res)
        })
        .catch(err => console.log(err,"Error, You are not Authorised"))
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login', values)
        .then( res =>{
            if(res.data.login){
                navigate('/')
            }else{
                alert("The email and password you have entered does not exist in our Database")
            }
            console.log(res.data)
        }).catch( err => console.log(err, "Error in Verifying"))
    }
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
    <div className="bg-light p-3 rounded w-25">
        <h2>Log-In</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor=""><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email' name='email' onChange={handleInput} className='form-control rounded-0' />
            </div>
            <div className="mb-3">
                <label htmlFor=""><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' name='password' onChange={handleInput} className='form-control rounded-0' />
            </div>
            <button type="submit" className='btn btn-info mb-2 w-100'>Login</button>
        
            <p>You agree to our Termas and Consitions</p>
            <Link to='/Signup' className='btn btn-deafult border w-100 bg-white rounded-0 text-decorator-none'>SignUp</Link>
        </form>
    </div>
    </div>
  )
}

export default Login