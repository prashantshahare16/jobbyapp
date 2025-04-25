import { Route,Routes } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Jobs from "./jobs";
import NotFound from "./notFound";

const App =()=>{

return(

<Routes>

   <Route path="/" element={<Home/>}></Route>

   <Route path="/Login" element={<Login/>}></Route>

   <Route path="/Jobs" element={<Jobs/>}></Route>
   
   <Route path="/*" element={<NotFound/>}></Route>





</Routes>



)




}





export default App;