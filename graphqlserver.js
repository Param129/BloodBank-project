// graphql-api/server.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema, root } = require('./schema');
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const PORT = 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
