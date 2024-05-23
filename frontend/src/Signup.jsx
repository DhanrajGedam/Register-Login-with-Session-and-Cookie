import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:''
    })
    const navigate = useNavigate()
    function handleInput(e){
        setValues(prev => ({...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        axios.post('http://localhost:3000/signup', values)
        .then(res => {
            console.log(res.data)
            navigate('/login')
        } )
        .catch(err => console.log(err, "Error in sending the Data"))
    }
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
    <div className="bg-light p-3 rounded w-25">
        <h2>Sign-Up</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor=""><strong>Name</strong></label>
                <input type="text" placeholder='Enter Name' name='name' onChange={handleInput} className='form-control rounded-0' />
            </div>
            <div className="mb-3">
                <label htmlFor=""><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email' name='email' onChange={handleInput} className='form-control rounded-0' />
            </div>
            <div className="mb-3">
                <label htmlFor=""><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' name='password' onChange={handleInput} className='form-control rounded-0' />
            </div>
            <button type="submit" className='btn btn-info mb-2 w-100' >SignUp</button>
        
            <p>You agree to our Termas and Consitions</p>
            <Link to='/login' className='btn btn-default border w-100 bg-white rounded-0 text-decorator-none'>Login</Link>
        </form>
    </div>
    </div>
  )
}

export default Signup