import React from "react"

export default class MasyarakatList extends React.Component{
    render(){
        return (
            <div className="card col-sm-12 my-1">
                <div className="card-body row">

                    <div className="col-sm-7">
                        {/* description */}
                        <h5 className="text-bold">{this.props.nama}</h5>
                        <h6 className="text-secondary">NIK : {this.props.nik}</h6>
                        <h6 className="text-secondary">Username : {this.props.username}</h6>
                        <h6 className="text-secondary">Nomor HP : {this.props.telp}</h6>
                    </div>
                    <div className="col-sm-2">
                        {/* action */}
                        <button className="btn btn-sm btn-outline-danger btn-block mt-4"
                        onClick={this.props.onDrop}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
