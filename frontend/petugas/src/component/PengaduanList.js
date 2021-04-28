import React from "react"

export default class PengaduanList extends React.Component{
    render(){
        return (
            <div className="card col-sm-12 my-1">
                <div className="card-body row">
                <div className="col-sm-3">
                {/* image */}
                <img alt={this.props.foto} src={this.props.foto}
                className="img-fluid" alt="Responsive Image" />
            </div>

                    <div className="col-sm-7 mt-4">
                        {/* description */}
                        <h6>ID Pengaduan : {this.props.id_pengaduan}</h6>
                        <h6>Nama Masyarakat : {this.props.nama}</h6>
                        <h6>Laporan : {this.props.isi_laporan}</h6>
                        <h6>Status : {this.props.status}</h6>
                    </div>

                    <div className="col-sm-2">
                        {/* ubah status */}
                        <button className="btn btn-sm btn-outline-primary btn-block mt-2"
                        onClick={this.props.onEdit}>
                            Status
                        </button>

                        {/* tambah tanggapan */}
                        <button type="button" class="btn btn-sm btn-outline-success btn-block" onClick={() => this.props.onAdd()}
                        disabled={this.props.tanggapan !== null}>
                              Tambah Tanggapan
                        </button>

                        {/* edit tanggapan */}
                        <button type="button" class="btn btn-sm btn-outline-warning btn-block" onClick={() => this.props.onEditTanggapan()}
                        disabled={this.props.tanggapan === null}>
                              Edit Tanggapan
                        </button>

                        {/* lihat tanggapan */}
                        <button type="button" class="btn btn-sm btn-outline-info btn-block mt-2" onClick={this.props.onGet}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                        </svg>
                              <strong className = "ml-2">Lihat Tanggapan</strong>
                        </button>

                        {/* hapus */}
                        <button className="btn btn-sm btn-outline-danger btn-block"
                        onClick={this.props.onDrop}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
