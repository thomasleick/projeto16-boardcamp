const { Client } = require("pg");
const connectionString = process.env.DATABASE_URL;

const getClient = async () => {
  const client = new Client({ connectionString });
  await client.connect();
  return client;
};

module.exports = { getClient };
