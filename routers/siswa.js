const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

router.get('/', function (req, res) {
  connection.query('select * from siswa', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'server gagal',
        Error: err,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'data  siswa',
        data: rows[0],
      });
    }
  });
});

router.post(
  '/create',
  [body('Nama').notEmpty(), body('Jenis_Kelamin').notEmpty(), body('Tanggal_Lahir').notEmpty(), body('Alamat').notEmpty(), body('Email').notEmpty(), body('No_Telepon').notEmpty(), body('Kelas_ID').notEmpty()],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array(),
      });
    }
    let data = {
      Nama: req.body.Nama,
      Jenis_Kelamin: req.body.Jenis_Kelamin,
      Tanggal_Lahir: req.body.Tanggal_Lahir,
      Alamat: req.body.Alamat,
      Email: req.body.Email,
      No_Telepon: req.body.No_Telepon,
      Kelas_ID: req.body.Kelas_ID,
    };
    connection.query('insert into siswa set ?', data, function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'server gangguan',
        });
      } else {
        return res.status(201).json({
          status: true,
          message: 'data berhasil di buat',
          data: rows[0],
        });
      }
    });
  }
);

router.get('/(:id)', function (req, res) {
  let id = req.params.id;
  connection.query(`select * from siswa where ID_siswa = ${id}`, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'server error ',
        error: err,
      });
    }
    if (rows.length <= 0) {
      return res.status.json({
        status: false,
        message: 'not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'alat tangkap ada',
        data: rows[0],
      });
    }
  });
});

router.patch(
  '/update/:id',
  [body('Nama').notEmpty(), body('Jenis_Kelamin').notEmpty(), body('Tanggal_Lahir').notEmpty(), body('Alamat').notEmpty(), body('Email').notEmpty(), body('No_Telepon').notEmpty(), body('Kelas_ID').notEmpty()],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array(),
      });
    }
    let id = req.params.id;
    let data = {
      Nama: req.body.Nama,
      Jenis_Kelamin: req.body.Jenis_Kelamin,
      Tanggal_Lahir: req.body.Tanggal_Lahir,
      Alamat: req.body.Alamat,
      Email: req.body.Email,
      No_Telepon: req.body.No_Telepon,
      Kelas_ID: req.body.Kelas_ID,
    };
    connection.query(`update siswa set ? where ID_siswa = ${id}`, data, function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'server error',
        });
      } else {
        return res.status(200).json({
          status: true,
          message: 'update berhasil',
        });
      }
    });
  }
);

router.delete('/delete/(:id)', function (req, res) {
  let id = req.params.id;
  connection.query(`delete from siswa where ID_siswa = ${id}`, function (err, rows) {
    if (err) {
      return req.status(500).json({
        status: false,
        message: 'server error',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'data berhasil dihapus',
      });
    }
  });
});

module.exports = router;
