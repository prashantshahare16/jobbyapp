
import { Route, Routes } from "react-router-dom";
import Home from "./home"; 
import Login from "./login"; 
import Jobs from "./jobs";
import NotFound from "./notFound";
import ProtectedRoute from "./protectedRoute";
import JobsItemDetails from "./jobsItemDetails";



const App =()=>{

return(

  <Routes>
            

            <Route path = "/" element = {<ProtectedRoute Component = {Home}/>}></Route>

            <Route path = "/login" element = {<Login/>}></Route>

            <Route path = "/jobs" element = {<ProtectedRoute Component = {Jobs}/>}></Route>

            <Route path = "/jobs/:id" element = {<ProtectedRoute Component = {JobsItemDetails}/>}></Route>

            <Route path = "/*" element = {<NotFound/>}></Route>


        </Routes>



)




}





export default App;