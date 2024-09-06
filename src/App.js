import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Tour from "./pages/Tour/Tour";
import NotFound from "./pages/NotFound/NotFound";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/tour" element={<Tour />}/>
          <Route path="/hotel" element={<h1>Hotel Page</h1>}/>
          <Route path="/restaurant" element={<h1>Restaurant Page</h1>}/>
        </Route>
      
        <Route path="/login" element={<h1>Login Page</h1>}/>
        <Route path="/register" element={<h1>Register Page</h1>}/>

        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
