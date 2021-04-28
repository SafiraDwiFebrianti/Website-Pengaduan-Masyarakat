const express = require("express")
const app = express()

// memanggil controller
let admin = require("./controllers/admin")
let petugas = require("./controllers/petugas")
let masyarakat = require("./controllers/masyarakat")
let pengaduan = require("./controllers/pengaduan")
let tanggapan = require("./controllers/tanggapan")


app.use("/admin", admin)
app.use("/petugas", petugas)
app.use("/masyarakat", masyarakat)
app.use("/pengaduan", pengaduan)
app.use("/tanggapan", tanggapan)

app.use(express.static(__dirname))


app.listen(8000, () => {
  console.log("Server run on port 8000");
})
