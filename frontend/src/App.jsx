import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'bootstrap//dist/css/bootstrap.min.css'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' exact element= {<Home />}></Route>
      <Route path='/signup' exact element= {<Signup />}></Route>
      <Route path='/login' exact element= {<Login />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App