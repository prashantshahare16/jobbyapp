import { Route,Routes } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Jobs from "./jobs";
import NotFound from "./notFound";
import ProtectedRoute from "./protectedRoute";



const App =()=>{

return(

<Routes>

   <Route path="/" element={ <ProtectedRoute Component={Home}/>}></Route>

   <Route path="/Login" element={<Login/>}></Route>

   <Route path="/Jobs" element={ <ProtectedRoute Component={Jobs}/>}></Route>
   
   <Route path="/*" element={<NotFound/>}></Route>





</Routes>



)




}





export default App;