import React from "react"
import axios from "axios"
import { base_url } from "../config.js";

export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            message: "",
            logged: true
        }
    }

    // Fungsi untuk Login
    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password
        }

        let url = base_url + "/admin/login"

        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged) {
                let admin = response.data.admin
                let token = response.data.token
                localStorage.setItem("admin", JSON.stringify(admin))
                localStorage.setItem("token", token)
                this.props.history.push("/")
            } else {
                this.setState({message: response.data.message})
            }
        })
        .catch(error => console.log(error))
    }


    render(){
        return(
            <div className="container d-flex h-100 justify-content-center align-items-center">
                <div className="col-sm-4 card my-4 mx-8 bg-light">
                    <div className="ard-header-transparant my-4 text-info text-bold text-center">
                        <h4 >Pengaduan Masyarakat</h4>
                        <strong className="text-warning">Admin Sign In</strong>
                    </div>

                    <div className="card-body">
                        { !this.state.logged ?
                        (
                            <div className="alert alert-danger mt-1">
                                { this.state.message }
                            </div>
                        ) : null }
                        <form onSubmit={ev => this.Login(ev)}>
                          <div class="text-l text-info"> Username </div>
                            <input type="text" className="form-control mb-2" value={this.state.username}
                            onChange={ev => this.setState({username: ev.target.value})} />
                          <div class="text-l text-info "> Password </div>
                            <input type="password" className="form-control mb-4" value={this.state.password}
                            onChange={ev => this.setState({password: ev.target.value})}
                            autoComplete="false" />

                            <button className="btn btn-block btn-info mb-4 mt-2" type="submit">
                              Sign  In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
