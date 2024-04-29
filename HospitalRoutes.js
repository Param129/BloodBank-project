// rest-api/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { getAllHospital, getHospitalById, createHospital, updateHospital, deleteHospital } = require('./HospitalController');

router.get('/', getAllHospital);
router.get('/:id', getHospitalById);
router.post('/', createHospital);
router.put('/:id', updateHospital);
router.delete('/:id', deleteHospital);

module.exports = router;
