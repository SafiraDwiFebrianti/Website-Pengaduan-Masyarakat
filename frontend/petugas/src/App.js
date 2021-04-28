import React from "react"
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login"
import Pengaduan from "./pages/Pengaduan"
import Home from "./pages/Home"
import Masyarakat from "./pages/Masyarakat"


export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/pengaduan" component={Pengaduan} />
        <Route path="/masyarakat" component={Masyarakat} />
      </Switch>
    )
  }
}
