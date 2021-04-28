'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tanggapans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_tanggapan: {
        type: Sequelize.INTEGER
      },
      id_pengaduan: {
        type: Sequelize.INTEGER
      },
      tgl_tanggapan: {
        type: Sequelize.DATE
      },
      tanggapan: {
        type: Sequelize.TEXT
      },
      id_petugas: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('tanggapans');
  }
};