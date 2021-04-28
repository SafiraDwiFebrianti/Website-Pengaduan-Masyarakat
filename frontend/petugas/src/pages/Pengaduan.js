import React from "react"
import Navbar from "../component/Navbar"
import PengaduanList from "../component/PengaduanList.js";
import { base_url, pengaduan_foto_url } from "../config.js";
import $ from "jquery"
import axios from "axios"


export default class Pengaduan extends React.Component{
  constructor(){
      super()
      this.state = {
          pengaduan: [],
          token: "",
          action: "",
          id_pengaduan: "",
          id_petugas: "",
          nik: "",
          tgl_pengaduan: "",
          isi_laporan: "",
          foto: "",
          status: "",
          tanggapan: "",
          uploadFile: true,
          selectedPengaduan: null,
      }
      if (localStorage.getItem("token")) {
          this.state.token = localStorage.getItem("token")
      } else {
          window.location = "/login"
      }
      this.headerConfig.bind(this)
  }


  headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }


    // Fungsi untuk mendapatkan data Pengaduan
    getPengaduan = () => {
            let petugas = JSON.parse(localStorage.getItem("petugas"))
            let url = base_url + "/pengaduan"
            axios.get(url, this.headerConfig())
            .then(response=> {
                this.setState({pengaduan: response.data})
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


    // Fungsi untuk mendapatkan data Tanggapan
    getTanggapan = (pengaduan) => {
      $("#modal_detail").modal("show")
      this.setState({selectedPengaduan: pengaduan})
    }


    // Fungsi yang pertama dipanggil setelah render
    componentDidMount(){
            this.getPengaduan()
        }

    // Fungsi untuk INSERT tanggapan
    Add = (item) => {
            $("#modal_tanggapan").modal("show")
            this.setState({
                action: "insert",
                id_tanggapan: "",
                id_pengaduan: item.id_pengaduan,
                tanggapan: "",
                id_petugas: "",
                isi_laporan: item.isi_laporan,
                fillPassword: true,
                selectedPengaduan: item
            })
        }


    // Fungsi untuk mengedit data tanggapan
    EditTanggapan = selectedItem => {
        $("#modal_tanggapan").modal("show")
        this.setState({
            action: "update",
            id_tanggapan: selectedItem.tanggapan.id_tanggapan,
            isi_laporan: selectedItem.isi_laporan,
            id_pengaduan: selectedItem.id_pengaduan,
            tanggapan: selectedItem.tanggapan.tanggapan,
            id_petugas: selectedItem.tanggapan.id_petugas
        })
    }


    // Fungsi untuk menyimpan hasil tambah Tanggapan
    saveTanggapan = event => {
            event.preventDefault()
            $("#modal_tanggapan").modal("hide")
            let petugas = JSON.parse(localStorage.getItem("petugas"))
            let form = {
              id_tanggapan: this.state.id_tanggapan,
              id_pengaduan: this.state.id_pengaduan,
              tanggapan: this.state.tanggapan,
              id_petugas: petugas.id_petugas
            }

            let url = base_url + "/tanggapan"
            if (this.state.action === "insert") {
                axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getPengaduan()
                })
                .catch(error => console.log(error))
            } else if(this.state.action === "update") {
                axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getPengaduan()
                })
                .catch(error => console.log(error))
            }
        }


    // Fungsi untuk mengedit data pengaduan
    Edit = selectedItem => {
            $("#modal_pengaduan").modal("show")
            this.setState({
                action: "update",
                id_pengaduan: selectedItem.id_pengaduan,
                isi_laporan: selectedItem.isi_laporan,
                foto: null,
                status: selectedItem.status,
                uploadFile: false,
                fillPassword: false,
            })
        }




    // Fungsi untuk menyimpan hasil edit Pengaduan
    savePengaduan = event => {
            event.preventDefault()
            $("#modal_pengaduan").modal("hide")
            let form= {
              id_pengaduan: this.state.id_pengaduan,
              status: this.state.status
            }

            let url = base_url + "/pengaduan"
            if (this.state.action === "insert") {
                axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getPengaduan()
                })
                .catch(error => console.log(error))
            } else if(this.state.action === "update") {
                axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getPengaduan()
                })
                .catch(error => console.log(error))
            }
        }





    // Fungsi untuk menghapus data pengaduan
    dropPengaduan = selectedItem => {
    if (window.confirm("Apakah anda yakin untuk menghapus item ini ?")) {
        let url = base_url + "/pengaduan/" + selectedItem.id_pengaduan
        axios.delete(url, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getPengaduan()
        })
        .catch(error => console.log(error))
    }
  }



    render(){
      return (
          <div>
              <Navbar />
              <div className="container">
                  <h3 className="text-bold text-info mt-2">Daftar Pengaduan</h3>
                  <div className="row">
                      { this.state.pengaduan.map( item => (
                          <PengaduanList
                          key = {item.id_pengaduan}
                          foto = { pengaduan_foto_url + "/" + item.foto}
                          id_pengaduan = {item.id_pengaduan}
                          nik = {item.nik}
                          tanggapan = {item.tanggapan}
                          nama = {item.masyarakat.nama}
                          isi_laporan = {item.isi_laporan}
                          tgl_pengaduan = {item.tgl_pengaduan}
                          status = {item.status}
                          tanggapan = {item.tanggapan}
                          onAdd ={() => this.Add(item)}
                          onEdit = {() => this.Edit(item)}
                          onDrop = {() => this.dropPengaduan(item)}
                          onGet = {() => this.getTanggapan(item)}
                          onEditTanggapan = {() => this.EditTanggapan(item)}
                          />
                        )) }
                  </div>
              </div>


              {/* modal pengaduan  */}
              <div className="modal fade" id="modal_pengaduan">
                  <div className="modal-dialog">
                      <div className="modal-content">
                          <div className="modal-header bg-info text-white">
                              <h4>Ubah Status</h4>
                          </div>
                          <div className="modal-body">
                              <form onSubmit={ev => this.savePengaduan(ev)}>
                                Status :
                                  <select
                                  value={this.state.status}
                                  onChange={ev => this.setState({status: ev.target.value})}
                                  required>
                                    <option value="0">0</option>
                                    <option value="proses">proses</option>
                                    <option value="selesai">selesai</option>
                                  </select>
                                <button type="submit" className="btn btn-block btn-success mt-4">
                                    Simpan
                                </button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>


              {/* modal tanggapan  */}
              <div className="modal fade" id="modal_tanggapan">
                  <div className="modal-dialog">
                      <div className="modal-content">
                          <div className="modal-header bg-info text-white">
                              <h4>Form Tanggapan</h4>
                          </div>
                          <div className="modal-body">
                              <form onSubmit={ev => this.saveTanggapan(ev)}>
                                Laporan
                                  <input type="text" className="form-control mb-1"
                                  value={this.state.isi_laporan}
                                  readOnly
                                  required
                                  />

                                  Balasan Tanggapan
                                    <input type="text" className="form-control mb-1"
                                    value={this.state.tanggapan}
                                    onChange={ev => this.setState({tanggapan: ev.target.value})}
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


              {/* modal detail_tanggapan  */}
              <div className="modal fade" id="modal_detail">
                  <div className="modal-dialog">
                      <div className="modal-content">
                          <div className="modal-header bg-info text-white">
                              <h4>Tanggapan dari Pengaduan</h4>
                          </div>
                          <div className="modal-body">
                          <h6>ID Pengaduan : {(this.state.selectedPengaduan !== null) ? this.state.selectedPengaduan.id_pengaduan : null} </h6>
                          <h6>ID Petugas : {(this.state.selectedPengaduan !== null) ? (this.state.selectedPengaduan.tanggapan !== null ? this.state.selectedPengaduan.tanggapan.id_petugas : "-") : null} </h6>
                          <h6>Tanggal : {(this.state.selectedPengaduan !== null) ? this.state.selectedPengaduan.tgl_pengaduan: null} </h6>
                          <h6>Nama Masyarakat : {(this.state.selectedPengaduan !== null) ? this.state.selectedPengaduan.masyarakat.nama: null} </h6>
                          <h6>Laporan : {(this.state.selectedPengaduan !== null) ? this.state.selectedPengaduan.isi_laporan: null} </h6>
                          <h6>Tanggapan : {(this.state.selectedPengaduan !== null) ? (this.state.selectedPengaduan.tanggapan !== null ? this.state.selectedPengaduan.tanggapan.tanggapan : "-") : null} </h6>
                          <h6>Status : {(this.state.selectedPengaduan !== null) ? this.state.selectedPengaduan.status : null}</h6>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
                )
            }

    }
