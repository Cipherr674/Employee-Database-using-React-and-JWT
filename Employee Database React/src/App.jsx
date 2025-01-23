
import './App.css'
import Home from './component/Home'
import Login from './component/Login'
import { Form, Route, Routes } from 'react-router-dom'
import Privateroute from './component/Privateroute'
import Main from './component/Main'
import Addemployee from './component/Addemployee'



function App() {


  return (
    <>
      <Routes>
      <Route path='/' element={<Login/>}></Route>
      

      

      <Route element={<Privateroute/>}>
      <Route path='/Home'element={<Main child={<Home/>}/>}></Route>
      <Route path='/addemployee' element={<Main child={<Addemployee/>}/>}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
