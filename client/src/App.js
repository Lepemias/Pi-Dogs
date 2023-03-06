import React from "react";
import { Routes, Route } from "react-router-dom"
import Landing from './pages/Landing';
import Home from './pages/Home';
import Form from './pages/Form'
import Error from "./pages/Error";
import Nav from './components/Nav';
import Dog from "./components/Dog";
import Sidebar from "./components/Sidebar";
import './App.css';



function App() {
  return (
    <>
    
    <Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/dogs" element={<><Nav/><Home/><Sidebar/></>} />
    <Route path="/dogs/detail/:id" element={<><Nav/><Dog/></>} />
    <Route path="/create" element={<><Nav/><Form/></>} />
    <Route path="*" element={<><Nav/><Error/></>}/>
    </Routes>
    </>
  );
}

export default App;
