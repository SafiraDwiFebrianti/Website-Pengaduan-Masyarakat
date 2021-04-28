'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tanggapan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // definisi relasi dari foreign key ke primary key
      // tanggapan mengambil id_petugas dari tabel petugas
      this.belongsTo(models.petugas, {
        foreignKey: 'id_petugas',
        as: 'petugas'
      })

      // definisi relasi dari foreign key ke primary key
      // tanggapan mengambil id_pengaduan dari tabel pengaduan
      this.belongsTo(models.pengaduan, {
        foreignKey: 'id_pengaduan',
        as: 'pengaduan'
      })
    }
  };
  tanggapan.init({
    id_tanggapan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_pengaduan: DataTypes.INTEGER,
    tgl_tanggapan: DataTypes.DATE,
    tanggapan: DataTypes.TEXT,
    id_petugas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tanggapan',
    tableName: 'tanggapan',
    timestamps: false
  });
  return tanggapan;
};
