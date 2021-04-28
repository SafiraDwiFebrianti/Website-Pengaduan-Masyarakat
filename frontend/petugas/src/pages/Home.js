import React from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../config.js"
require('./style.css')


export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            adminName: null,
            pengaduanCount: 0,
            masyarakatCount: 0,
            transactionsCount: 0,
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }


    getPengaduan = () => {
        let url = base_url + "/pengaduan"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({pengaduanCount: response.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }


    getMasyarakat = () => {
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({masyarakatCount: response.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }


    getPetugas = () => {
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({petugasCount: response.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }


    componentDidMount(){
            this.getMasyarakat()
            this.getPengaduan()
            this.getPetugas()
        }


        render(){
        return (
            <div>
                <Navbar />
                <div className="container mt-2">
                <h3 className="my-2">
                    <h5>Helo, Petugas !</h5>
                </h3>
                    <div className="row">
                        {/* masyarakat count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div id="masyarakat" className="card-body">
                                    <h4 className="text-dark">
                                        <strong>Jumlah Masyarakat</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.masyarakatCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>


                        {/* petugas count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div id="petugas" className="card-body">
                                    <h4 className="text-dark">
                                        <strong>Jumlah Petugas</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.petugasCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>


                        {/* pengaduan count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div id="pengaduan" className="card-body">
                                    <h4 className="text-dark">
                                        <strong>Total Pengaduan</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.pengaduanCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
