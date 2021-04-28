const express = require('express')
const app = express()

// load model admin
const admin = require('../models/index').admin

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


// endpoint GET data admin
app.get("/", async(request, response) => {
  let result = await admin.findAll()
  response.json(result)
})


//endpoint GET data berdasar by id_admin
app.get("/:id_admin", async(request, response) => {
  let parameter = { id_admin: request.params.id_admin }
  let result = await admin.findOne({where: parameter})
  response.json(result)
})


// endpoint INSERT admin
app.post("/", (request, response) => {
  let data = {
    nama_admin: request.body.nama_admin,
    username: request.body.username,
    password: md5(request.body.password),
    telp: request.body.telp
  }

  // eksekusi insert data
  admin.create(data)
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
    nama_admin: request.body.nama_admin,
    username: request.body.username,
    password: md5(request.body.password),
    telp: request.body.telp
  }

  let parameter = {
    id_admin: request.body.id_admin
  }

  //eksekusi edit data
  admin.update(data, {where: parameter})
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
app.delete("/:id_admin", (request, response) => {
  let parameter = {
    id_admin: request.params.id_admin
  }

  //eksekusi hapus data
  admin.destroy({where: parameter})
  .then(res => {
    // saat sukses hapus data
    response.json({ message: 'Data berhasil dihapus'})
  })
  .catch(error => {
    // saat error hapus data
    response.json({ message: error.message})
  })
})


// endpoint LOGIN admin
app.post("/login", async(request, response) => {
  // prepare data
  let data = {
    username: request.body.username,
    password: md5(request.body.password)
  }

  let result = await admin.findOne({where: data})

  if(result == null) {
    response.json({
      logged: false,
      message: "Invalid username or password"
    })
  } else {
    // jika data ditemukan
    // define jwtheader (mendefinisikan tipe algoritma dan pembatasan masa berlakunya token)
    let header = {
      algorithm: "HS256", expiresIn: "1h"
    }

    // define payload (data yg akan dienkripsi menjadi token)
    let payload = {data: result}

    // proses generate token
    let token = jwt.sign(payload, SECRET_KEY, header)
    response.json({
      logged: true,
      token: token,
      admin: result
    })
  }
})

module.exports = app
