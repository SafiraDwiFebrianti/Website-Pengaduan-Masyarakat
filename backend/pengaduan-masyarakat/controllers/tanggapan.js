const express = require('express')
const app = express()
const models = require('../models/index')

// load model tanggapan
const tanggapan = require('../models/index').tanggapan

// load cors = untuk membuka port agar bisa diakses oleh public
const cors = require('cors')
app.use(cors())

//buka access request json
app.use(express.json())

//buka access request dari form-urlencoded
app.use(express.urlencoded({extended: true}))

// load md5
const md5 = require("md5")

// load jsonwebtoken
const jwt = require("jsonwebtoken")
const SECRET_KEY = 'test123'
const moment = require('moment')


// endpoint INSERT tanggapan
app.post("/", (request, response) => {
  let data = {
    id_tanggapan: request.body.id_tanggapan,
    id_pengaduan: request.body.id_pengaduan,
    tgl_tanggapan: moment().format('YYYY-MM-DD HH:mm:ss'),
    tanggapan: request.body.tanggapan,
    id_petugas: request.body.id_petugas
  }

  // eksekusi insert data
  tanggapan.create(data)
  .then(res => {
    // saat sukses tambah data
    response.json({ message: 'Data berhasil disimpan'})
  })
  .catch(error => {
    // saat error tambah data
    response.json({ message: error.message})
  })
})


//endpoint EDIT data
app.put("/", (request, response) => {
  let data = {
    id_pengaduan: request.body.id_pengaduan,
    tgl_tanggapan: moment().format('YYYY-MM-DD HH:mm:ss'),
    tanggapan: request.body.tanggapan,
    id_petugas: request.body.id_petugas
  }

  let parameter = {
    id_tanggapan: request.body.id_tanggapan
  }

  //eksekusi edit data
  tanggapan.update(data, {where: parameter})
  .then(res => {
    // saat sukses edit data
    response.json({ message: 'Data berhasil diubah'})
  })
  .catch(error => {
    // saat error edit data
    response.json({ message: error.message})
  })
})


// endpoint DELETE data
app.delete("/:id_tanggapan", (request, response) => {
  let parameter = {
    id_tanggapan: request.params.id_tanggapan
  }

  //eksekusi hapus data
  tanggapan.destroy({where: parameter})
  .then(res => {
    // saat sukses hapus data
    response.json({ message: 'Data berhasil dihapus'})
  })
  .catch(error => {
    // saat error hapus data
    response.json({ message: error.message})
  })
})



module.exports = app
