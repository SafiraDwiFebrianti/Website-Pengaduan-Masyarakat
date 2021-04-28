'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pengaduans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pengaduan: {
        type: Sequelize.INTEGER
      },
      tanggal_pengaduan: {
        type: Sequelize.DATE
      },
      nik: {
        type: Sequelize.STRING
      },
      isi_laporan: {
        type: Sequelize.TEXT
      },
      foto: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pengaduans');
  }
};