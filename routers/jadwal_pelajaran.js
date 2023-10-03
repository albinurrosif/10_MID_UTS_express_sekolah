const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

router.get('/', function (req, res) {
  connection.query('select * from jadwal_pelajaran', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'server gagal',
        Error: err,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'data  jadwal_pelajaran',
        data: rows[0],
      });
    }
  });
});

router.post('/create', [body('Hari').notEmpty(), body('Jam_Mulai').notEmpty(), body('Jam_Selesai').notEmpty(), body('Kelas_ID').notEmpty(), body('Mata_Pelajaran_ID').notEmpty(), body('Guru_ID').notEmpty()], (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  let data = {
    Hari: req.body.Hari,
    Jam_Mulai: req.body.Jam_Mulai,
    Jam_Selesai: req.body.Jam_Selesai,
    Kelas_ID: req.body.Kelas_ID,
    Mata_Pelajaran_ID: req.body.Mata_Pelajaran_ID,
    Guru_ID: req.body.Guru_ID,
  };
  connection.query('insert into jadwal_pelajaran set ?', data, function (err, rows) {
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
});

router.get('/(:id)', function (req, res) {
  let id = req.params.id;
  connection.query(`select * from jadwal_pelajaran where ID_jadwal_pelajaran = ${id}`, function (err, rows) {
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

router.patch('/update/:id', [body('Hari').notEmpty(), body('Jam_Mulai').notEmpty(), body('Jam_Selesai').notEmpty(), body('Kelas_ID').notEmpty(), body('Mata_Pelajaran_ID').notEmpty(), body('Guru_ID').notEmpty()], (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array(),
    });
  }
  let id = req.params.id;
  let data = {
    Hari: req.body.Hari,
    Jam_Mulai: req.body.Jam_Mulai,
    Jam_Selesai: req.body.Jam_Selesai,
    Kelas_ID: req.body.Kelas_ID,
    Mata_Pelajaran_ID: req.body.Mata_Pelajaran_ID,
    Guru_ID: req.body.Guru_ID,
  };
  connection.query(`update jadwal_pelajaran set ? where ID_jadwal_pelajaran = ${id}`, data, function (err, rows) {
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
});

router.delete('/delete/(:id)', function (req, res) {
  let id = req.params.id;
  connection.query(`delete from jadwal_pelajaran where ID_jadwal_pelajaran = ${id}`, function (err, rows) {
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
