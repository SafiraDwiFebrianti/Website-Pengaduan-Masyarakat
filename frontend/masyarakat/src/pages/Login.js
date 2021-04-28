import React from "react"
import axios from "axios"
import { base_url } from "../config.js";
import $ from "jquery"

export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            nik: "",
            nama: "",
            username: "",
            password: "",
            telp: "",
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

        let url = base_url + "/masyarakat/login"

        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged) {
                let masyarakat = response.data.masyarakat
                let token = response.data.token
                localStorage.setItem("masyarakat", JSON.stringify(masyarakat))
                localStorage.setItem("token", token)
                this.props.history.push("/")
            } else {
                this.setState({message: response.data.message})
            }
        })
        .catch(error => console.log(error))
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    // Fungsi untuk INSERT masyarakat
    Add = () => {
        $("#modal_masyarakat").modal("show")
        this.setState({
            action: "insert",
            nik: "",
            nama: "",
            username: "",
            password: "",
            telp: "",
            fillPassword: true,
        })
    }
     // Fungsi untuk menyimpan
     saveMasyarakat = event => {
        event.preventDefault()
        $("#modal_masyarakat").modal("hide")
        // prepare data
        let form = {
          nik: this.state.nik,
          nama: this.state.nama,
          username: this.state.username,
          telp: this.state.telp
        }

        if (this.state.fillPassword) {
            form.password = this.state.password
        }

        let url = base_url + "/masyarakat"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMasyarakat()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMasyarakat()
            })
            .catch(error => console.log(error))
        }
    }


    render(){
        return(
            <div className="container d-flex h-100 justify-content-center align-items-center">
                <div className="col-sm-4 card my-4 mx-8 bg-light">
                    <div className="ard-header-transparant my-4 text-info text-bold text-center">
                        <h4 >Pengaduan Masyarakat</h4>
                        <strong className="text-warning">Masyarakat Sign In</strong>
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

                        <div class="text-l mb-2"> Belum punya akun? </div>
                        <button className="btn btn-block btn-outline-warning mb-1 rounded" onClick={() => this.Add()}>
                            Register
                        </button>

                        {/* modal masyarakat  */}
                        <div className="modal fade" id="modal_masyarakat">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header bg-info text-white ">
                                        <h4>Form Register Masyarakat</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={ev => this.saveMasyarakat(ev)}>

                                            NIK:
                                            <input type="text" className="form-control mb-1"
                                            value={this.state.nik}
                                            onChange={ev => this.setState({nik: ev.target.value})}
                                            required
                                            />

                                            Nama:
                                            <input type="text" className="form-control mb-1"
                                            value={this.state.nama}
                                            onChange={ev => this.setState({nama: ev.target.value})}
                                            required
                                            />

                                            Username
                                            <input type="text" className="form-control mb-1"
                                            value={this.state.username}
                                            onChange={ev => this.setState({username: ev.target.value})}
                                            required
                                            />

                                            { this.state.action === "update" && this.state.fillPassword === false ? (
                                                <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                                onClick={() => this.setState({fillPassword: true})}>
                                                    Change Password
                                                </button>
                                            ) : (
                                                <div>
                                                    Password
                                                    <input type="password" className="form-control mb-1"
                                                    value={this.state.password}
                                                    onChange={ev => this.setState({password: ev.target.value})}
                                                    required
                                                    />
                                                </div>
                                            ) }

                                            Telepon :
                                            <input type="text" className="form-control mb-1"
                                            value={this.state.telp}
                                            onChange={ev => this.setState({telp: ev.target.value})}
                                            required
                                            />

                                            <button type="submit" className="btn btn-block btn-success">
                                                Register
                                            </button>
                                        </form>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
