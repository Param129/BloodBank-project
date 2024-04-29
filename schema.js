// graphql-api/index.js
const { buildSchema } = require('graphql');
const { getAllHospital, getHospitalById, createHospital, updateHospital, deleteHospital } = require('./GraphHospitalCont');
const { getAllusers, getUserById, createUser, updateUser, deleteUser } = require('./GraphUserCont');

const schema = buildSchema(`
  type Hospital {
    id: ID!
    title: String!
    userId: ID!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    hospitals: [Hospital!]!
  }

  type Query {
    hospitals: [Hospital!]!
    hospital(id: ID!): Hospital!
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    createHospital(title: String!, userId: ID!): Hospital!
    updateHospital(id: ID!, title: String!, userId: ID!): Hospital!
    deleteHospital(id: ID!): Hospital!
    createUser(name: String!): User!
    updateUser(id: ID!, name: String!): User!
    deleteUser(id: ID!): User!
  }
`);

const root = {
  hospitals: getAllHospital,
  hospital: ({ id }) => getHospitalById({ params: { id } }),
  createHospital: ({ title, userId }) => createHospital({ body: { title, userId } }),
  updateHospital: ({ id, title, userId }) => updateHospital({ params: { id }, body: { title, userId } }),
  deleteHospital: ({ id }) => deleteHospital({ params: { id } }),
  users: getAllusers,
  user: ({ id }) => getUserById({ params: { id } }),
  createUser: ({ name }) => createUser({ body: { name } }),
  updateUser: ({ id, name }) => updateUser({ params: { id }, body: { name } }),
  deleteUser: ({ id }) => deleteUser({ params: { id } })
};

module.exports = {
  schema,
  root
};
