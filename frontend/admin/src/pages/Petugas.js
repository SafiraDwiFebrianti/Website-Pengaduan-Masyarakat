import React from "react"
import Navbar from "../component/Navbar"
import PetugasList from "../component/PetugasList.js";
import { base_url } from "../config.js";
import $ from "jquery"
import axios from "axios"

export default class Petugas extends React.Component{
  constructor(){
      super()
      this.state = {
          petugas: [],
          token: "",
          action: "",
          id_petugas: "",
          nama_petugas: "",
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

    // Fungsi untuk mendapatkan data petugas
    getPetugas = () => {
            let url = base_url + "/petugas"
            axios.get(url, this.headerConfig())
            .then(response=> {
                this.setState({petugas: response.data})
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
        this.getPetugas()
    }


    // Fungsi untuk INSERT petugas
    Add = () => {
    $("#modal_petugas").modal("show")
    this.setState({
        action: "insert",
        id_petugas: "",
        nama_petugas: "",
        username: "",
        password: "",
        telp: "",
        fillPassword: true,
    })
}


    // Fungsi untuk PUT petugas
    Edit = selectedItem => {
    $("#modal_petugas").modal("show")
    this.setState({
        action: "update",
        id_petugas: selectedItem.id_petugas,
        nama_petugas: selectedItem.nama_petugas,
        username: selectedItem.username,
        password: "",
        telp: selectedItem.telp,
        fillPassword: false,
    })
}


    // Fungsi untuk menyimpan
    savePetugas = event => {
    event.preventDefault()
    $("#modal_petugas").modal("hide")
    // prepare data
    let form = {
      id_petugas: this.state.id_petugas,
      nama_petugas: this.state.nama_petugas,
      username: this.state.username,
      telp: this.state.telp
    }

    if (this.state.fillPassword) {
        form.password = this.state.password
    }

    let url = base_url + "/petugas"
    if (this.state.action === "insert") {
        axios.post(url, form, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getPetugas()
        })
        .catch(error => console.log(error))
    } else if(this.state.action === "update") {
        axios.put(url, form, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getPetugas()
        })
        .catch(error => console.log(error))
    }
}


    // Fungsi untuk menghapus data petugas
    dropPetugas = selectedItem => {
    if (window.confirm("Apakah anda yakin untuk menghapus item ini ?")) {
        let url = base_url + "/petugas/" + selectedItem.id_petugas
        axios.delete(url, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getPetugas()
        })
        .catch(error => console.log(error))
    }
}



    render(){
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Daftar Petugas</h3>
                    <div className="row">
                        { this.state.petugas.map( item => (
                            <PetugasList
                            key = {item.id_petugas}
                            nama_petugas = {item.nama_petugas}
                            id_petugas = {item.id_petugas}
                            username = {item.username}
                            telp = {item.telp}
                            onEdit = {() => this.Edit(item)}
                            onDrop = {() => this.dropPetugas(item)}
                            />
                        )) }
                    </div>
                    <button className="btn btn-success mt-4" onClick={() => this.Add()}>
                        Tambah Petugas
                    </button>
                </div>

                {/* modal customer  */}
                <div className="modal fade" id="modal_petugas">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4>Form Petugas</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.savePetugas(ev)}>
                                    Nama :
                                    <input type="text" className="form-control mb-1"
                                    value={this.state.nama_petugas}
                                    onChange={ev => this.setState({nama_petugas: ev.target.value})}
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
