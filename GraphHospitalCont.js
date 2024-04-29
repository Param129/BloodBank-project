// graphql-api/HospitalController.js
let hospitals = [];
let hospitalIdCounter = 1;

const getAllHospital = async () => {
  return hospitals;
};

const getHospitalById = async ({ id }) => {
  const parsedId = parseInt(id);
  return hospitals.find(hosp => hosp.id === parsedId);
};

const createHospital = async ({ body }) => {
  const { title, userId } = body;
  const hospital = { id: hospitalIdCounter++, title, userId };
  hospitals.push(hospital);
  return hospital;
};

const updateHospital = async ({ params, body }) => {
  const id = parseInt(params.id);
  const { title, userId } = body;
  const index = hospitals.findIndex(hosp => hosp.id === id);
  if (index !== -1) {
    hospitals[index] = { ...hospitals[index], title, userId };
    return hospitals[index];
  } else {
    throw new Error('Hospital not found');
  }
};

const deleteHospital = async ({ params }) => {
  const id = parseInt(params.id);
  const index = hospitals.findIndex(hosp => hosp.id === id);
  if (index !== -1) {
    return hospitals.splice(index, 1)[0];
  } else {
    throw new Error('Hospital not found');
  }
};

module.exports = {
  getAllHospital,
  getHospitalById,
  createHospital,
  updateHospital,
  deleteHospital
};
