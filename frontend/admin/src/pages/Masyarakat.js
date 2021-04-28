import React from "react"
import Navbar from "../component/Navbar"
import MasyarakatList from "../component/MasyarakatList";
import { base_url } from "../config.js";
import $ from "jquery"
import axios from "axios"


export default class Masyarakat extends React.Component{
  constructor(){
      super()
      this.state = {
          masyarakat: [],
          token: "",
          action: "",
          nik: "",
          nama: "",
          username: "",
          password: "",
          telp: "",
          fillPassword: true,
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

    // Fungsi untuk mendapatkan data Masyarakat
    getMasyarakat = () => {
            let url = base_url + "/masyarakat"
            axios.get(url, this.headerConfig())
            .then(response=> {
                this.setState({masyarakat: response.data})
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

    // Fungsi yang pertama dipanggil setelah render
    componentDidMount(){
        this.getMasyarakat()
    }


    // Fungsi untuk menghapus data masyarakat
    dropMasyarakat = selectedItem => {
    if (window.confirm("Apakah anda yakin untuk menghapus item ini ?")) {
        let url = base_url + "/masyarakat/" + selectedItem.nik
        axios.delete(url, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getCustomers()
        })
        .catch(error => console.log(error))
    }
}


        render(){
            return (
                <div>
                   <Navbar />
                   <div className="container">
                       <h3 className="text-bold text-info mt-2">Daftar Masyarakat</h3>
                       <div className="row">
                           { this.state.masyarakat.map( item => (
                               <MasyarakatList
                               key = {item.nik}
                               nama = {item.nama}
                               nik = {item.nik}
                               username = {item.username}
                               telp = {item.telp}
                               onDrop = {() => this.dropMasyarakat(item)}
                                />
                           )) }
                       </div>
                    </div>

                     {/* modal customer  */}
                     <div className="modal fade" id="modal_masyarakat">
                         <div className="modal-dialog">
                             <div className="modal-content">
                                 <div className="modal-header bg-info text-white">
                                     <h4>Form Masyarakat</h4>
                                 </div>
                                 <div className="modal-body">
                                     <form onSubmit={ev => this.saveMasyarakat(ev)}>
                                         NIK :
                                         <input type="text" className="form-control mb-1"
                                         value={this.state.nik}
                                         onChange={ev => this.setState({nik: ev.target.value})}
                                         required
                                         />

                                         Nama :
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

                                        Nomor HP :
                                         <input type="text" className="form-control mb-1"
                                         value={this.state.telp}
                                         onChange={ev => this.setState({telp: ev.target.value})}
                                         required
                                         />

                                        <button type="submit" className="btn btn-block btn-success">
                                            Simpan
                                        </button>
                                     </form>
                                 </div>
                             </div>
                         </div>
                     </div>
                </div>
            )
        }
      }
