 import Cookies from 'js-cookie';
 import { useNavigate } from 'react-router-dom';

import './index.css'
import { useEffect } from 'react';

const Home = ()=>{

   const token = Cookies.get("jwtToken");
   const navigate = useNavigate();

useEffect(()=>{

if(token === undefined){
 
   navigate("/login")

}



},[]);


   return<h1>Home Component</h1>

}
export default Home;