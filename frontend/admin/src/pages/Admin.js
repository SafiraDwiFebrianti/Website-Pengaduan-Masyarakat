import React from "react"
import Navbar from "../component/Navbar"
import AdminList from "../component/AdminList.js";
import { base_url } from "../config.js";
import $ from "jquery"
import axios from "axios"

export default class Admin extends React.Component{
  constructor(){
      super()
      this.state = {
          admin: [],
          token: "",
          action: "",
          id_admin: "",
          nama_admin: "",
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

    // Fungsi untuk mendapatkan data admin
    getAdmin = () => {
            let url = base_url + "/admin"
            axios.get(url, this.headerConfig())
            .then(response=> {
                this.setState({admin: response.data})
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
        this.getAdmin()
    }

    // Fungsi untuk INSERT admin
    Add = () => {
            $("#modal_admin").modal("show")
            this.setState({
                action: "insert",
                id_admin: "",
                nama_admin: "",
                username: "",
                password: "",
                telp: "",
                fillPassword: true,
            })
        }

    // Fungsi untuk PUT admin
    Edit = selectedItem => {
    $("#modal_admin").modal("show")
    this.setState({
        action: "update",
        id_admin: selectedItem.id_admin,
        nama_admin: selectedItem.nama_admin,
        username: selectedItem.username,
        password: "",
        telp: selectedItem.telp,
        fillPassword: false,
    })
}

    // Fungsi untuk menyimpan
    saveAdmin = event => {
    event.preventDefault()
    $("#modal_admin").modal("hide")
    // prepare data
    let form = {
      id_admin: this.state.id_admin,
      nama_admin: this.state.nama_admin,
      username: this.state.username,
      telp: this.state.telp
    }

    if (this.state.fillPassword) {
        form.password = this.state.password
    }

    let url = base_url + "/admin"
    if (this.state.action === "insert") {
        axios.post(url, form, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getAdmin()
        })
        .catch(error => console.log(error))
    } else if(this.state.action === "update") {
        axios.put(url, form, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getAdmin()
        })
        .catch(error => console.log(error))
    }
}

    // Fungsi untuk menghapus data admin
    dropAdmin = selectedItem => {
    if (window.confirm("Apakah anda yakin untuk menghapus item ini ?")) {
        let url = base_url + "/admin/" + selectedItem.id_admin
        axios.delete(url, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getAdmin()
        })
        .catch(error => console.log(error))
    }
}

        render(){
            return (
                <div>
                   <Navbar />
                   <div className="container">
                       <h3 className="text-bold text-info mt-2">Daftar Admin</h3>
                       <div className="row">
                           { this.state.admin.map( item => (
                               <AdminList
                               key = {item.id_admin}
                               nama_admin = {item.nama_admin}
                               id_admin = {item.id_admin}
                               username = {item.username}
                               telp = {item.telp}
                               onEdit = {() => this.Edit(item)}
                               onDrop = {() => this.dropAdmin(item)}
                                />
                           )) }
                       </div>
                       <button className="btn btn-success mt-4" onClick={() => this.Add()}>
                           Tambah Admin
                       </button>
                    </div>

                     {/* modal customer  */}
                     <div className="modal fade" id="modal_admin">
                         <div className="modal-dialog">
                             <div className="modal-content">
                                 <div className="modal-header bg-info text-white">
                                     <h4>Form Admin</h4>
                                 </div>
                                 <div className="modal-body">
                                     <form onSubmit={ev => this.saveAdmin(ev)}>
                                         Nama :
                                         <input type="text" className="form-control mb-1"
                                         value={this.state.nama_admin}
                                         onChange={ev => this.setState({nama_admin: ev.target.value})}
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
