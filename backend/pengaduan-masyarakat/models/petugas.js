'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class petugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // definisi relasi dari primary ke foreign key
      // satu petugas dapat menanggapi lebih dari 1 pengaduan
      this.hasMany(models.tanggapan, {
        foreignKey: 'id_petugas',
        as: 'tanggapan'
      })
    }
  };
  petugas.init({
    id_petugas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_petugas: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    telp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'petugas',
    tableName: 'petugas',
    timestamps: false
  });
  return petugas;
};
