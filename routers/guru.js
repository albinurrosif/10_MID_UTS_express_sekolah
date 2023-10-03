const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

router.get('/', function (req, res) {
  connection.query('select * from guru', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'server gagal',
        Error: err,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'data  guru',
        data: rows[0],
      });
    }
  });
});

router.post('/create', [body('Nama').notEmpty(), body('Jenis_Kelamin').notEmpty(), body('Tanggal_Lahir').notEmpty(), body('Email').notEmpty(), body('No_Telepon').notEmpty(), body('Mata_Pelajaran').notEmpty()], (req, res) => {
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
    Email: req.body.Email,
    No_Telepon: req.body.No_Telepon,
    Mata_Pelajaran: req.body.Mata_Pelajaran,
  };
  connection.query('insert into guru set ?', data, function (err, rows) {
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
  connection.query(`select * from guru where ID_Guru = ${id}`, function (err, rows) {
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

router.patch('/update/:id', [body('Nama').notEmpty(), body('Jenis_Kelamin').notEmpty(), body('Tanggal_Lahir').notEmpty(), body('Email').notEmpty(), body('No_Telepon').notEmpty(), body('Mata_Pelajaran').notEmpty()], (req, res) => {
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
    Email: req.body.Email,
    No_Telepon: req.body.No_Telepon,
    Mata_Pelajaran: req.body.Mata_Pelajaran,
  };
  connection.query(`update guru set ? where ID_Guru = ${id}`, data, function (err, rows) {
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
  connection.query(`delete from guru where ID_Guru = ${id}`, function (err, rows) {
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
