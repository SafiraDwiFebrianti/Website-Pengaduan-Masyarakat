import React from "react"
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login"
import Printadu from "./pages/Printpengaduan"
import Pengaduan from "./pages/Pengaduan"
import Home from "./pages/Home"
import Masyarakat from "./pages/Masyarakat"
import Petugas from "./pages/Petugas"
import Admin from "./pages/Admin"



export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/print" component={Printadu} />
        <Route path="/pengaduan" component={Pengaduan} />
        <Route path="/masyarakat" component={Masyarakat} />
        <Route path="/petugas" component={Petugas} />
        <Route path="/admin" component={Admin} />
      </Switch>
    )
  }
}
