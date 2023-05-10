const { getClient } = require("./utils/db");
const { buildQuery } = require("./utils/buildQuery");

const createRental = async (rentalData) => {
  const client = await getClient();

  try {
    const result = await client.query({
      text: 'INSERT INTO rentals("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [
        rentalData.customerId,
        rentalData.gameId,
        rentalData.rentDate,
        rentalData.daysRented,
        rentalData.returnDate,
        rentalData.originalPrice,
        rentalData.delayFee,
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

const findRentals = async (params) => {
  const { query, values } = buildQuery("rentals", params);
  const client = await getClient();
  try {
    const result = await client.query(query, values);
    return result.rows;
  } catch (err) {
    console.error("Error getting rentals", err);
    throw err;
  } finally {
    await client.end();
  }
};

const findRentalById = async (id) => {
  const client = await getClient();
  try {
    const result = await client.query("SELECT * FROM rentals WHERE id=$1", [
      id,
    ]);
    return result.rows[0];
  } catch (err) {
    console.error("Error getting rental", err);
    throw err;
  } finally {
    await client.end();
  }
};

const findRentalsByGameId = async (id) => {
  const client = await getClient();
  try {
    const result = await client.query(
      'SELECT * FROM rentals WHERE "gameId"=$1',
      [id]
    );
    return result.rows;
  } catch (err) {
    console.error("Error getting rental", err);
    throw err;
  } finally {
    await client.end();
  }
};

const returnRentalWithId = async (id, returnDate, delayFee) => {
  const client = await getClient();
  try {
    const result = await client.query(
      'UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3 RETURNING *',
      [returnDate, delayFee, id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Error returning rental", err);
    throw err;
  } finally {
    await client.end();
  }
};

const deleteRentalWithId = async (id) => {
  const client = await getClient();
  try {
    await client.query('DELETE FROM rentals WHERE id=$1', [id]);
  } catch (err) {
    console.error("Error deleting rental", err);
    throw err;
  } finally {
    await client.end();
  }
};

module.exports = {
  createRental,
  findRentals,
  findRentalById,
  findRentalsByGameId,
  returnRentalWithId,
  deleteRentalWithId,
};
