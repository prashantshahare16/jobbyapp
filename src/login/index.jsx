import { useState } from 'react';
import './index.css'
const Login = ()=>{


   const[allValues,setValues]=useState({
      username:"",
      password:"",
      errorMsg:"",
   })

   const onSubmitUserDetails =async(e)=>{
      e.preventDefault();
      

         const api ="https://apis.ccbp.in/login";

         const userDetails ={
            username:allValues.username,
            password:allValues.password
         }
         const options ={
            method:"Post",
            body:JSON.stringify(userDetails)
         }
       try {
         const response =await fetch(api,options);
         const data = await response.json();

         if(response.ok===true){
            setValues({...allValues,errorMsg:""})

         }
         else{
            setValues({...allValues,errorMsg: data.error_msg})
         }

       } catch (error) {
         console.log(error);
         
       }
       


   }  

   
   const onChangeUserName =(e)=>{
      setValues({...allValues,username:e.target.value});
   }

   const onChangePassword=(e)=>{
      setValues({...allValues, password:e.target.value});
   }

   return(
      <div className="login-main-cont">
      <form className="my-form" onSubmit={onSubmitUserDetails}>
      <div className="web-logo-cont">
         <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png "className="w-25"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Username</label>
        <input
         type="text" 
         className="form-control"
          id="exampleInputEmail1"
           aria-describedby="emailHelp"
           onChange={onChangeUserName}
           />
        <small id="emailHelp" className="form-text text-muted">
         We'll never share your Username with anyone else.
         </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
         type="password"
         className="form-control"
           id="exampleInputPassword1"
           onChange={onChangePassword}
           />
      </div>
      
      <button type="submit" className="btn btn-success form-control">
         Submit
         </button>
         <br/>
         <p className="text-danger">{allValues.errorMsg}</p>
    </form>


    </div>

   );




};


export default Login;