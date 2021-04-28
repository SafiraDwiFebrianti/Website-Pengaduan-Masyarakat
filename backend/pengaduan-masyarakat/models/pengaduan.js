'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pengaduan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // definisi relasi dari foreign key ke primary key
      // pengaduan mengambil nik dari tabel masyarakat
      this.belongsTo(models.masyarakat, {
        foreignKey: 'nik',
        as: 'masyarakat'
      })

      // definisi relasi dari primary ke foreign key
      // satu pengaduan hanya dapat ditanggapi 1 kali
      this.hasOne(models.tanggapan, {
        foreignKey: 'id_pengaduan',
        as: 'tanggapan'
      })
    }
  };
  pengaduan.init({
    id_pengaduan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tgl_pengaduan: DataTypes.DATE,
    nik: DataTypes.STRING,
    isi_laporan: DataTypes.TEXT,
    foto: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pengaduan',
    tableName: 'pengaduan',
    timestamps: false
  });
  return pengaduan;
};
