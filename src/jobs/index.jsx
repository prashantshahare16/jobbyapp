// import React,{ useEffect, useState } from 'react';

// import Cookies from 'js-cookie';

// import Header from '../header';
// import DisplayAllJobs from '../displayAllJobs';

// import FilterSection from '../filterSection';
// import './index.css'





// const Jobs = ()=>{

//   const [allValues,setValues]=useState({

//     jobsArr:[],
//     emptypeList:[], 
//     SalaryRangeTypeList:[],
//     minPakage:"",
//     userinput:"",
   
//   });

//   const token =Cookies.get("jwt_token");

//   useEffect(()=>{

//     const onFetchUserData =async()=>{
//       const{emptypeList,minPakage,userinput} =allValues;
//       const api =`https://apis.ccbp.in/jobs?employment_type=${emptypeList}&minimum_package=${minPakage}&search=${userinput}`;

      

//       const options = { 
//           method:"Get",
//           headers:{
//             Authorization:`Bearer ${token}`
//           }

//         }
//          try{
//           const response = await fetch(api,options);
//           const data = await response.json();

//           if (response.ok=== true){
//             setValues({...allValues,jobsArr:data.jobs});
//           }
         
//          }
//          catch (error){
//           console.log(error);
//          }
        
//       }
//       onFetchUserData(); 

//   },[allValues.userinput,, allValues.emptypeList, allValues.minPakage])

//   const onChangeSearchIn = (e)=>{

//     if(e.key ==="Enter"){

//       setValues({...allValues,userinput:e.target.value});
//     }

//   }


//   const onChangeEmpType = (value,checked)=>{
//     // console.log("Child calling function aginast one way data binding solved");
//     // console.log(checked);
//     if(checked === true){

//         setValues({...allValues, emptypeList : [...allValues.emptypeList,value]});

//     } 
//     else{

//         setValues({...allValues, emptypeList : allValues.emptypeList.filter( each=> each !== value )});

//     }

//   }
//   const ChangeSalaryRangeType = (value,checked)=>{
//     // console.log(checked)

//     if(checked === true){

//         setValues({...allValues, SalaryRangeTypeList : [...allValues.SalaryRangeTypeList,value]});

//     }
//     else{

//         setValues({...allValues, SalaryRangeTypeList : allValues.SalaryRangeTypeList.filter( each=> each !== value )});

//     }

//   }




//   return(
//     <div>
//       <Header/> 
//             <div className='all-jobs-filter-cont'>
                
//                   <div className='filter-cont'>
//                     <FilterSection ChangeEmployeeType={onChangeEmpType}
//                             ChangeSalaryRangeType={ChangeSalaryRangeType}
//                             />

//                   </div>

//                   <div className='all-jobs-cont'>
//                     <input  onKeyUp={onChangeSearchIn} type ="search" 
//                     placeholder="search"
//                      className="form-control w-75 mb-3"/>
                    
                 
//                       <ul>
//                           {
                            
//                             allValues.jobsArr.map(each =><DisplayAllJobs  key={each.id} jobsItem={each} />)      
//                           }                       
//                     </ul>
//                   </div>  
//             </div>      


//     </div>
//   )
// };
  
// export default Jobs;



import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import Header from "../header";
import DisplayAllJobs from "../DisplayAllJobs/index.jsx";
import FilterSection from "../filterSection";
import "./index.css";

const Jobs = () => {
  const [jobsArr, setJobsArr] = useState([]);
  const [emptypeList, setEmpTypeList] = useState([]);
  const [SalaryRangeTypeList, setSalaryRangeTypeList] = useState([]);
  const [minPackage, setMinPackage] = useState("");
  
  const [userInput, setUserInput] = useState("");

  const token = Cookies.get("jwtToken");

  const fetchJobs = async () => {
    if (!token) {
      console.error("JWT token not found.");
      return;
    }

    const employmentType = emptypeList.join(",");
    const minimumPackage = SalaryRangeTypeList[0] || "";
    const api = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${userInput}`;

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(api, options);
      const data = await response.json();

      if (response.ok) {
        setJobsArr(data.jobs);
      } else {
        console.error("Failed to fetch jobs:", data.error_msg);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, [emptypeList, SalaryRangeTypeList, userInput]);

  const onChangeSearchIn = (e) => {
    if (e.key === "Enter") {
      setUserInput(e.target.value);
    }
  };

  const onChangeEmpType = (value, checked) => {
    if (checked) {
      setEmpTypeList((prev) => [...prev, value]);
    } else {
      setEmpTypeList((prev) => prev.filter((each) => each !== value));
    }
  };

  const ChangeSalaryRangeType = (value, checked) => {
    if (checked) {
      // Assuming only one salary range can be selected
      setSalaryRangeTypeList([value]);
    } else {
      setSalaryRangeTypeList([]);
    }
  };

  return (
    <div>
      <Header />
      <div className="all-jobs-filter-cont">
        <div className="filter-cont">
          <FilterSection
            ChangeEmployeeType={onChangeEmpType}
            ChangeSalaryRangeType={ChangeSalaryRangeType}
          />
        </div>

        <div className="all-jobs-cont">
          <input
            onKeyUp={onChangeSearchIn}
            type="search"
            placeholder="Search"
            className="form-control w-75 mb-3 ml-5"
          />

          <ul>
            {jobsArr.map((each) => (
              <DisplayAllJobs key={each.id} jobsItem={each} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
