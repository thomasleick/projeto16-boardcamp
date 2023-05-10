const { getClient } = require("./utils/db");

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

const findRentals = async () => {
  const client = await getClient();
  try {
    const result = await client.query("SELECT * FROM rentals");
    return result.rows;
  } catch (err) {
    console.error("Error getting rentals", err);
    throw err;
  } finally {
    await client.end();
  }
};

const findRentalsByGameId = async (id) => {
  const client = await getClient();
  try {
    const result = await client.query('SELECT * FROM rentals WHERE "gameId"=$1', [id]);
    return result.rows;
  } catch (err) {
    console.error("Error getting rental", err);
    throw err;
  } finally {
    await client.end();
  }
};

module.exports = {
  createRental,
  findRentals,
  findRentalsByGameId,
};
