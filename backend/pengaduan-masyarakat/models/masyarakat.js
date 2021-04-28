'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masyarakat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // definisi relasi dari primary ke foreign key
      // satu masyarakat bisa menambah banyak pengaduan
      this.hasMany(models.pengaduan, {
        foreignKey: 'nik',
        as: 'pengaduan'
      })
    }
  };
  masyarakat.init({
    nik: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    telp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masyarakat',
    tableName: 'masyarakat',
    timestamps: false
  });
  return masyarakat;
};
