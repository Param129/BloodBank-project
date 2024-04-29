// rest-api/controllers/UserController.js
let users = [];
let userIdCounter = 1;

const getAllusers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const User = users.find(User => User.id === id);
  if (User) {
    res.json(User);
  } else {
    res.status(404).send('User not found');
  }
};

const createUser = (req, res) => {
  const { name } = req.body;
  const User = { id: userIdCounter++, name };
  users.push(User);
  res.status(201).json(User);
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const index = users.findIndex(User => User.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], name };
    res.json(users[index]);
  } else {
    res.status(404).send('User not found');
  }
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(User => User.id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    res.json(deletedUser);
  } else {
    res.status(404).send('User not found');
  }
};

module.exports = {
  getAllusers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
