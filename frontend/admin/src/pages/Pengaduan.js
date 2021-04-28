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
          isi_laporan: "",
          tgl_pengaduan: "",
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
      $("#modal_tanggapan").modal("show")
      this.setState({selectedPengaduan: pengaduan})
    }


    // Fungsi yang pertama dipanggil setelah render
    componentDidMount(){
            this.getPengaduan()
        }


    render(){
      return (
          <div>
              <Navbar />
              <div className="container">
                  <h3 className="text-bold text-info mt-2">Daftar Pengaduan</h3>
                  <button className="btn btn-warning mb-4"><a href="/print" className="text-white">Unduh Laporan</a></button>
                  <div className="row">
                      { this.state.pengaduan.map( item => (
                          <PengaduanList
                          key = {item.id_pengaduan}
                          foto = { pengaduan_foto_url + "/" + item.foto}
                          id_pengaduan = {item.id_pengaduan}
                          id_petugas = {item.id_petugas}
                          nik = {item.nik}
                          tgl_pengaduan = {item.tgl_pengaduan}
                          nama = {item.masyarakat.nama}
                          isi_laporan = {item.isi_laporan}
                          status = {item.status}
                          tanggapan = {item.tanggapan}
                          onGet = {() => this.getTanggapan(item)}
                          />
                        )) }
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
                          <h6>ID Petugas : {(this.state.selectedPengaduan !== null) ? (this.state.selectedPengaduan.petugas !== null ? this.state.selectedPengaduan.tanggapan.id_petugas : "-") : null} </h6>
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
