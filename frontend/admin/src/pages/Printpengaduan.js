import React from "react"
import Navbar from "../component/Navbar"
import { base_url, pengaduan_foto_url } from "../config.js";
import axios from "axios"
import Pdf from "react-to-pdf";
const ref = React.createRef();
const options = {
    orientation: 'landscape',
};

export default class Printpengaduan extends React.Component{
    constructor(){
        super()
        this.state = {
            pengaduan: [],
            token: "",
            action: "",
            nik: "",
            status: 0,
            foto: "",
            id_petugas: "",
            tanggapan:"",
            id_pengaduan:0,
            nama:"",
            isi_laporan:"",
            uploadFile: true,
        }
        this.handleChange = this.handleChange.bind(this);
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }

    }

    handleChange(event) {
        this.setState({status: event.target.value});
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



    componentDidMount(){
        this.getPengaduan()
    }


    render(){
        return (
            <div>
            <Navbar/>
                <div className="container">
                <Pdf targetRef={ref} filename="code-laporan.pdf" options={options} >
                    {({ toPdf }) => <button className="btn btn-success" onClick={toPdf}>Unduh PDF</button>}
                </Pdf>
                <div ref={ref}>
                   <h3 className="text-bold text-info mt-4 mb-4">Laporan Pengaduan</h3>
                    <table className="table table-bordered mt-4">
                        <thead class="table-dark">
                            <tr>
                                <th>NO</th>
                                <th>NIK</th>
                                <th>Nama Masyarakat</th>
                                <th>Laporan</th>
                                <th>Tanggal</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.pengaduan.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.nik}</td>
                                    <td>{item.masyarakat.nama}</td>
                                    <td>{item.isi_laporan}</td>
                                    <td>{item.tgl_pengaduan}</td>
                                    <td>{item.status}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        )
    }

}
