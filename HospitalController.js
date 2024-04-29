// rest-api/controllers/bookController.js
let hospitals = [];
let hospitalIdCounter = 1;

const getAllHospital = (req, res) => {
  res.json(hospitals);
};

const getHospitalById = (req, res) => {
  const id = parseInt(req.params.id);
  const hospital = hospitals.find(hosp => hosp.id === id);
  if (hospital) {
    res.json(hospital);
  } else {
    res.status(404).send('Hospital  not found');
  }
};

const createHospital = (req, res) => {
  const { title, userId } = req.body;
  const hospital = { id: hospitalIdCounter++, title, userId };
  hospitals.push(hospital);
  res.status(201).json(hospital);
};

const updateHospital = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, userId } = req.body;
  const index = hospitals.findIndex(hosp => hosp.id === id);
  if (index !== -1) {
    hospitals[index] = { ...hospitals[index], title, userId };
    res.json(hospitals[index]);
  } else {
    res.status(404).send('Hospital not found');
  }
};

const deleteHospital = (req, res) => {
  const id = parseInt(req.params.id);
  const index = hospitals.findIndex(hosp => hosp.id === id);
  if (index !== -1) {
    const deletedHospital = hospitals.splice(index, 1)[0];
    res.json(deletedHospital);
  } else {
    res.status(404).send('Hospital not found');
  }
};

module.exports = {
  getAllHospital,
  getHospitalById,
  createHospital,
  updateHospital,
  deleteHospital
};
