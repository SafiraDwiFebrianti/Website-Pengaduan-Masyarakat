const express = require('express')
const app = express()
const models = require('../models/index')

// load model pengaduan
const pengaduan = require('../models/index').pengaduan

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

// load moment
const moment = require('moment')

//load path
const path = require('path')

const fs = require('fs')

// load multer
const multer = require('multer')
app.use(express.static(__dirname))


//config upload file proses
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //set file storage
        cb(null, './foto')
    },
    filename: (req, file, cb) => {
        //generate file name
        cb(null, "foto-"+ Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage : storage})


// endpoint GET data pengaduan
app.get("/", async(request, response) => {
    let result = await pengaduan.findAll({
        include: [
            "masyarakat",
            {
                model: models.tanggapan,
                as: "tanggapan",
                include: ["petugas"]
            }
        ]
    })
    response.json(result)
})


//endpoint GET data berdasar by nik
app.get("/:nik", async(request, response) => {
  let parameter = { nik: request.params.nik }
  let result = await pengaduan.findAll({
    where: parameter,
    include: [
      "masyarakat",
      {
        model: models.tanggapan,
        as: "tanggapan",
        include: "petugas"
      }
    ]
  })
  response.json(result)
})


// endpoint INSERT pengaduan
app.post("/",upload.single("foto"), (request, response) => {
    //prepare data from request
    let data = {
        tgl_pengaduan: moment().format('YYYY-MM-DD HH:mm:ss'),
        nik: request.body.nik,
        isi_laporan: request.body.isi_laporan,
        foto: request.file.filename,
        status: request.body.status
    }

    //eksekusi insert data
    pengaduan.create(data)
    .then(res => {
        //saat sukses insert data
        response.json({ message: 'Data berhasil disimpan'})
    })

    .catch(error => {
        //saat error insert data
        response.json({message: error.message})
    })
})


//endpoint EDIT data
app.put("/",  upload.single("foto"), async(request,response) => {
    // prepare data from request
    let data = {
        tgl_pengaduan: moment().format('YYYY-MM-DD HH:mm:ss'),
        nik: request.body.nik,
        isi_laporan: request.body.isi_laporan,
        status: request.body.status
    }

    let parameter = {
        id_pengaduan: request.body.id_pengaduan
    }

    if(request.file) {
        //jika mengandung file yang di upload, maka ambil data file yang akan dihapus
        let result = await pengaduan.findOne({where: parameter})
        let fileName = result.foto

        //hapus file yang lama
        let dir = path.join(__dirname,"../foto",fileName)
        fs.unlink(dir, (error) => {})
        data.foto = request.file.filename
    }

    // eksekusi edit data
    pengaduan.update(data, {where: parameter})
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
app.delete("/:id_pengaduan", async(request, response) => {
    let parameter = {id_pengaduan: request.params.id_pengaduan}

    let result = await pengaduan.findOne({where: parameter})
    let fileName = result.foto

    //hapus file yang lama
    let dir = path.join(__dirname,"../foto",fileName)
    fs.unlink(dir, (error) => {})

    // eksekusi hapus data
    pengaduan.destroy({where: parameter})
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
