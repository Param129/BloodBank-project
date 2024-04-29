// rest-api/routes/authorRoutes.js
const express = require('express');
const router = express.Router();
const { getAllusers, getUserById, createUser, updateUser, deleteUser } = require('./UserController');

router.get('/', getAllusers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
