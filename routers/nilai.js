const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

router.get('/', function (req, res) {
  connection.query('select * from nilai', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'server gagal',
        Error: err,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'data  nilai',
        data: rows[0],
      });
    }
  });
});

router.post('/create', [body('Siswa_ID').notEmpty(), body('Mata_Pelajaran_ID').notEmpty(), body('Nilai_Tugas').notEmpty(), body('Nilai_Ujian').notEmpty(), body('Nilai_Akhir').notEmpty()], (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  let data = {
    Siswa_ID: req.body.Siswa_ID,
    Mata_Pelajaran_ID: req.body.Mata_Pelajaran_ID,
    Nilai_Tugas: req.body.Nilai_Tugas,
    Nilai_Ujian: req.body.Nilai_Ujian,
    Nilai_Akhir: req.body.Nilai_Akhir,
  };
  connection.query('insert into nilai set ?', data, function (err, rows) {
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
  connection.query(`select * from nilai where ID_nilai = ${id}`, function (err, rows) {
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

router.patch('/update/:id', [body('Siswa_ID').notEmpty(), body('Mata_Pelajaran_ID').notEmpty(), body('Nilai_Tugas').notEmpty(), body('Nilai_Ujian').notEmpty(), body('Nilai_Akhir').notEmpty()], (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array(),
    });
  }
  let id = req.params.id;
  let data = {
    Siswa_ID: req.body.Siswa_ID,
    Mata_Pelajaran_ID: req.body.Mata_Pelajaran_ID,
    Nilai_Tugas: req.body.Nilai_Tugas,
    Nilai_Ujian: req.body.Nilai_Ujian,
    Nilai_Akhir: req.body.Nilai_Akhir,
  };
  connection.query(`update nilai set ? where ID_nilai = ${id}`, data, function (err, rows) {
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
  connection.query(`delete from nilai where ID_nilai = ${id}`, function (err, rows) {
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
