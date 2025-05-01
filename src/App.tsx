import {BrowserRouter, Route, Routes} from "react-router-dom";
import ScrollToTop from "./Components/Other/ScrollToTop.tsx";
import BaseHome from "./Features/BaseHome.tsx";
function App() {


  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<BaseHome/>} path='/'/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
