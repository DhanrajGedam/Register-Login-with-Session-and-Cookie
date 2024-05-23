import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [name, setName] = useState('')
    const navigate = useNavigate();
    
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:3000')
        .then( res =>{
            if(res.data.Authorised){
                setName(res.data.username)
            }else{
                navigate('/login')
            }
            console.log(res)
        })
        .catch(err => console.log(err,"Error, You are not Authorised"))
    },[])
  return (
    <h1><i>Welcome {name}, you are authorised successfully</i></h1>
  )
}

export default Home