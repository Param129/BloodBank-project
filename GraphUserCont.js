// graphql-api/UserController.js

let users = [];
let userIdCounter = 1;

const getAllusers = async () => {
  return users;
};

const getUserById = async ({ id }) => {
  const parsedId = parseInt(id);
  return users.find(user => user.id === parsedId);
};

const createUser = async ({ body }) => {
  const { name } = body;
  const newUser = { id: userIdCounter++, name };
  users.push(newUser);
  return newUser;
};

const updateUser = async ({ params, body }) => {
  const id = parseInt(params.id);
  const { name } = body;
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], name };
    return users[index];
  } else {
    throw new Error('User not found');
  }
};

const deleteUser = async ({ params }) => {
  const id = parseInt(params.id);
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  } else {
    throw new Error('User not found');
  }
};

module.exports = {
  getAllusers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
