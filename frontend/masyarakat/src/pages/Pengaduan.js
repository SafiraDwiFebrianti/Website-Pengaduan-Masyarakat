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
          nik: "",
          isi_laporan: "",
          foto: "",
          status: "",
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
      let masyarakat = JSON.parse(localStorage.getItem("masyarakat"))
            let url = base_url + "/pengaduan/" + masyarakat.nik
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
      $("#modal_tanggapan").modal("show")
      this.setState({selectedPengaduan: pengaduan})
    }


    // Fungsi yang pertama dipanggil setelah render
    componentDidMount(){
            this.getPengaduan()
        }

    // Fungsi untuk INSERT pengaduan
    Add = () => {
            $("#modal_pengaduan").modal("show")
            this.setState({
                action: "insert",
                id_pengaduan: "",
                nik: "",
                isi_laporan: "",
                foto: null,
                fillPassword: true,
                uploadFile: true
            })
        }


    // Fungsi untuk menyimpan hasil edit
    savePengaduan = event => {
            event.preventDefault()
            $("#modal_pengaduan").modal("hide")
            let masyarakat = JSON.parse(localStorage.getItem("masyarakat"))
            let form = new FormData()
            form.append("id_pengaduan", this.state.id_pengaduan)
            form.append("nik", masyarakat.nik)
            form.append("isi_laporan", this.state.isi_laporan)
            if (this.state.uploadFile) {
                form.append("foto", this.state.foto)
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
                          nama = {item.masyarakat.nama}
                          isi_laporan = {item.isi_laporan}
                          status = {item.status}
                          tgl_pengaduan = {item.tgl_pengaduan}
                          tanggapan = {item.tanggapan}
                          onEdit = {() => this.Edit(item)}
                          onDrop = {() => this.dropPengaduan(item)}
                          onGet = {() => this.getTanggapan(item)}
                          />
                        )) }
                  </div>

                  <button className="btn btn-success mt-4" onClick={() => this.Add()}>
                      Tambah Pengaduan
                  </button>
              </div>


              {/* modal pengaduan  */}
              <div className="modal fade" id="modal_pengaduan">
                  <div className="modal-dialog">
                      <div className="modal-content">
                          <div className="modal-header bg-info text-white">
                              <h4>Form Pengaduan</h4>
                          </div>
                          <div className="modal-body">
                              <form onSubmit={ev => this.savePengaduan(ev)}>
                                Isi Laporan
                                  <input type="text" className="form-control mb-1"
                                  value={this.state.isi_laporan}
                                  onChange={ev => this.setState({isi_laporan: ev.target.value})}
                                  required
                                  />

                                  { this.state.action === "update" && this.state.uploadFile === false ? (
                                  <button className="btn btn-sm btn-dark mb-1 btn-block"
                                  onClick={() => this.setState({uploadFile: true})}>
                                      Ubah gambar pengaduan
                                  </button>
                              ) : (
                                  <div>
                                      Foto Pengaduan
                                      <input type="file" className="form-control mb-1"
                                      onChange={ev => this.setState({foto: ev.target.files[0]})}
                                      required
                                      />
                                  </div>
                              ) }

                                <button type="submit" className="btn btn-block btn-success">
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
                              <h4>Tanggapan dari Pengaduan</h4>
                          </div>
                          <div className="modal-body">
                          <h6>ID Pengaduan : {(this.state.selectedPengaduan !== null) ? this.state.selectedPengaduan.id_pengaduan : null} </h6>
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
