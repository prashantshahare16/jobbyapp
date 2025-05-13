
import { useEffect } from 'react'
import './index.css'
import { useState } from 'react'
import Cookies from 'js-cookie';


const employeeType= [
     {
       label: 'Full Time',
       employeeTypeId: 'FULLTIME',
     },
     {
       label: 'Part Time',
       employeeTypeId: 'PARTTIME',
     },
     {
       label: 'Freelance',
       employeeTypeId: 'FREELANCE',
     },
     {
       label: 'Internship',
       employeeTypeId: 'INTERNSHIP',
     },
   ]
   
   const salaryRangeType = [
     {
          salaryRangeTypeId: '1000000',
       label: '10 LPA and above',
     },
     {
          salaryRangeTypeId: '2000000',
       label: '20 LPA and above',
     },
     {
          salaryRangeTypeId: '3000000',
       label: '30 LPA and above',
     },
     {
          salaryRangeTypeId: '4000000',
       label: '40 LPA and above',
     },
   ]
  
     
   const FilterSection = (prop) => {

  
     const [allValues,setvalue] = useState({
         profileDetails:{},
     })
     
     const {ChangeEmployeeType} = prop;
    //  console.log(ChangeEmployeeType);

     const {ChangeSalaryRangeType} = prop;
     
      const{SeletedSalaryRange}= prop;

     const token = Cookies.get("jwtToken");
     
     
       useEffect(()=>{
     
         const getProfileDetails = async () => {
     
           const apiUrl = 'https://apis.ccbp.in/profile'
           const options = {
             headers: {
               Authorization: `Bearer ${token}`,
             },
             method: 'GET',
           }
           const response = await fetch(apiUrl, options)
           const data = await response.json()
           if (response.ok === true) {
             setvalue({...allValues,profileDetails:data.profile_details})
           }
         }
         getProfileDetails();
     
       },[])
      
     return(
          <div className="Filter-group-container">
            <div className="ProfileDetails">
              <img src={allValues.profileDetails.profile_image_url} 
              alt="profile"
               className="profile-image" 
               />
              <h1 className="profile-name text-">{allValues.profileDetails.name}</h1>
              <p className="profile-bio text-secondary">{allValues.profileDetails.short_bio}</p>
             </div>
    
           <div className="EmployeeType">
                <hr className="line"/> 
                <p className="Filter-heading">EmployeeType</p>
               <ul>
               {employeeType.map(each=>(
                    <li key={each.employeeTypeId}>

                         <input
                          onChange={(e)=>ChangeEmployeeType(e.target.value,e.target.checked)}
                          id={each.employeeTypeId}
                           type="checkbox" 
                           value={each.employeeTypeId}
                          
                           />
                         <label htmlFor={each.employeeTypeId} className="filter-label">{each.label}</label>
                    </li>
               ))}
               </ul>
            </div>

            <div className="SalaryRangeType">
              <hr className="line"/> 
                  <p className="Filter-heading">SalaryRangeType</p>
                  <ul>
                   {salaryRangeType.map(each=>(
                          <li key={each.salaryRangeTypeId}>
                                <input                              
                                 id={each.salaryRangeTypeId}
                                  type="radio"
                                  value={each.salaryRangeTypeId}
                                  checked={SeletedSalaryRange === each.salaryRangeTypeId}
                                 onChange={(e) => {
                                      const selectedValue = e.target.value;
                                      const isAlreadySelected = SeletedSalaryRange === selectedValue;
                                      ChangeSalaryRangeType(selectedValue, !isAlreadySelected); // Toggle logic
                                    }}
                                        />
                                 
                                <label htmlFor={each.salaryRangeTypeId}className="filter-label">{each.label}</label>
                               
                          </li>
                          
                      ))  }
                   

                  </ul>
            </div>

           </div>
      )                    
    
    };    
          


export default FilterSection;