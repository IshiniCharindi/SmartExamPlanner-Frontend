import {BrowserRouter, Route, Routes} from "react-router-dom";
import ScrollToTop from "./Components/Other/ScrollToTop.tsx";
import BaseHome from "./Features/BaseHome.tsx";
import Dashboard from "./Components/Dashboard/dashboard.tsx";
import AddLecturer from "./Components/LecturerDetails/AddLecturer.tsx";
function App() {


  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<BaseHome/>} path='/'/>
          <Route element={<Dashboard/>} path='/dashboard'/>
          <Route element={<AddLecturer/>} path='/addlecturer'/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
