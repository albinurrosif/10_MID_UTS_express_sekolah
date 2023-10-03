const express = require('express');
const app = express();
const port = 3000;
const bodyPs = require('body-parser');

app.use(bodyPs.urlencoded({ extended: false }));
app.use(bodyPs.json());

const guruRouter = require('./routers/guru');
app.use('/api/guru', guruRouter);

const mata_pelajaranRouter = require('./routers/mata_pelajaran');
app.use('/api/mata_pelajaran', mata_pelajaranRouter);

const kelasRouter = require('./routers/kelas');
app.use('/api/kelas', kelasRouter);

const siswaRouter = require('./routers/siswa');
app.use('/api/siswa', siswaRouter);

const absensiRouter = require('./routers/absensi');
app.use('/api/absensi', absensiRouter);

const nilaiRouter = require('./routers/nilai');
app.use('/api/nilai', nilaiRouter);

const jadwal_pelajaranRouter = require('./routers/jadwal_pelajaran');
app.use('/api/jadwal_pelajaran', jadwal_pelajaranRouter);

app.listen(port, () => {
  console.log(`aplikasi berjalan di http::localhost:${port}`);
});
