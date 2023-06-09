const { getClient } = require("./utils/db");
const { buildQuery } = require("./utils/buildQuery");

const createGame = async (gameData) => {
  const client = await getClient();
  try {
    const result = await client.query({
      text: 'INSERT INTO games(name, image, "stockTotal", "pricePerDay") VALUES($1, $2, $3, $4) RETURNING *',
      values: [
        gameData.name,
        gameData.image,
        gameData.stockTotal,
        gameData.pricePerDay,
      ],
    });

    return result.rows[0];
  } catch (err) {
    console.error("Error inserting new game", err);
    throw err;
  } finally {
    await client.end();
  }
};

const findGames = async (params) => {
  const { query, values } = buildQuery("games", params);
  const client = await getClient();

  try {
    const result = await client.query(query, values);
    return result.rows;
  } catch (err) {
    console.error("Error getting games", err);
    throw err;
  } finally {
    await client.end();
  }
};

const findGameById = async (id) => {
  const client = await getClient();
  try {
    const result = await client.query("SELECT * FROM games WHERE id=$1", [id]);
    return result.rows[0];
  } catch (err) {
    console.error("Error getting game", err);
    throw err;
  } finally {
    await client.end();
  }
};
const findGameByName = async (name) => {
  const client = await getClient();
  try {
    const result = await client.query("SELECT * FROM games WHERE name=$1", [
      name,
    ]);
    return result.rows[0];
  } catch (err) {
    console.error("Error getting game", err);
    throw err;
  } finally {
    await client.end();
  }
};

module.exports = {
  createGame,
  findGames,
  findGameById,
  findGameByName,
};
