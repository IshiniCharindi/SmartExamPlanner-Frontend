import {BrowserRouter, Route, Routes} from "react-router-dom";
import ScrollToTop from "./Components/Other/ScrollToTop.tsx";
import BaseHome from "./Features/BaseHome.tsx";
import Login from "./Components/login/Login.tsx";
import Signup from "./Components/signup/Signup.tsx";
import AddingExamSession from "./Features/AddingExamSession.tsx";
import Dashboard from "./Components/Dashboard/dashboard.tsx";
import {Toaster} from "react-hot-toast";
function App() {


  return (
    <>
      <Toaster
          position="top-right"
          reverseOrder={false}
      />
      <BrowserRouter>

        <ScrollToTop />
        <Routes>
          <Route element={<BaseHome/>} path='/'/>
          <Route element={<Login/>} path='/login'/>
          <Route element={<Signup/>} path='/signup'/>
          <Route element={<AddingExamSession/>} path='/addSession'/>
          <Route element={<Dashboard/>} path='/admin'/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
