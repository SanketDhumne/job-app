import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Jobs from "./components/job";
import Login from "./components/login";
import NotFound from "./components/notFound";
import ProtectedRoute from "./components/protectedRoute";


const App = () =>{

  return (
    <Routes>
      <Route path="/" element= {<ProtectedRoute Component={Home}/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/jobs" element={<ProtectedRoute Component={Jobs}/>} />
      <Route path="/*" element={<NotFound/>} />
    </Routes>
  )
}

export default App;