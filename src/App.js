import { useEffect, useState } from "react";
import SkillForm from "./SkillForm";
import "./App.css"
import { Route,Routes} from "react-router-dom";
import Home from './Home';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import Login from './Login';
import Messages from './table';
import AddSkills from './addskills';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isauthenticated,setisauthenticated]=useState(false);
      const auth = getAuth();
  useEffect(()=>{

onAuthStateChanged(auth, (user) => {
  if (user) {
    setisauthenticated(true)
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(uid)
    // ...
  } else {
    setisauthenticated(false)
    // User is signed out
    // ...
  }
});

  },[])

  return (
<div>
  
  <Routes> 
      <Route element={<Home/>} path={'/'}></Route>
      <Route element={<About/>} path={'/about'}></Route>
      <Route element={<Skills/>} path={'/Skills'}></Route>
      <Route element={<Experience/>} path={'/Experience'}></Route>
      <Route element={<Projects/>} path={'/Projects'}></Route>
      <Route element={<Contact/>} path={'/Contact'}></Route>
      {!isauthenticated?(
      <Route element={<Login/>} path={'/Login'}></Route>
      ):null}
      <Route element={<Messages/>} path={'/table'}></Route>
      <Route element={<AddSkills/>} path={'/addskills'}></Route>
      <Route element={<SkillForm/>} path={'/skillform'}></Route>
     </Routes>
 

    </div>
  );

}
export default App;




