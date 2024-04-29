// rest-api/server.js
const express = require('express');
const UserRoutes = require('./UserRoutes');
const HospitalRoutes = require('./HospitalRoutes');
const app = express();

app.use(express.json());

app.use('/users', UserRoutes);
app.use('/hospitals', HospitalRoutes);

const PORT = 6000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
