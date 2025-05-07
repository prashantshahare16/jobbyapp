import './index.css';
import { FaBriefcase,FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
 
const DisplayAllJobs=(props)=>{

const {jobsItem}=props;
const {id,title,rating,company_logo_url,location,job_description,employment_type,package_per_annum}=jobsItem;
   return(
      <li  className="display-jobs-card">

            <div className="logo-rating-cont">
               <img src ={company_logo_url} style={{width:"70px"}}/>

            <div className="title-rating-cont">
               <h3>{title}</h3>
               <FaStar style={{color:"gold",marginRight:"5px"}}/>
               <span>{rating}</span>
               
                </div>


            </div>
            
         <div className="location-emptype-ppa-cont">
                  <div className="location-emptype-cont">
                        <FaLocationDot className="mr-2"/>
                        <span className="mr-4">{location}</span>

                        <FaBriefcase className="mr-3"/>
                        <span>{employment_type}</span>
                  </div>
        
                  <h5>{package_per_annum}</h5>

         </div>

            <hr className="line"/>

            <h5>Description</h5>
            <p>{job_description}</p>

      </li>
      
   )  

}


export default DisplayAllJobs;