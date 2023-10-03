const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

router.get('/', function (req, res) {
  connection.query('select * from mata_pelajaran', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'server gagal',
        Error: err,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'data  mata_pelajaran',
        data: rows[0],
      });
    }
  });
});

router.post('/create', [body('Nama_Mata_Pelajaran').notEmpty()], (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  let data = {
    Nama_Mata_Pelajaran: req.body.Nama_Mata_Pelajaran,
  };
  connection.query('insert into mata_pelajaran set ?', data, function (err, rows) {
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
  connection.query(`select * from mata_pelajaran where ID_mata_pelajaran = ${id}`, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'server error ',
        error: err,
      });
    }
    if (rows.length <= 0) {
      return res.status(200).json({
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

router.patch('/update/:id', [body('Nama_Mata_Pelajaran').notEmpty()], (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array(),
    });
  }
  let id = req.params.id;
  let data = {
    Nama_Mata_Pelajaran: req.body.Nama_Mata_Pelajaran,
  };
  connection.query(`update mata_pelajaran set ? where ID_mata_pelajaran = ${id}`, data, function (err, rows) {
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
  connection.query(`delete from mata_pelajaran where ID_mata_pelajaran = ${id}`, function (err, rows) {
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
