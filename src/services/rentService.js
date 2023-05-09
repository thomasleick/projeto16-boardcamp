const { getClient } = require("./utils/db");

const createRent = async (rentData) => {
    const client = await getClient();

    try {

      const result = await client.query({
        text: 'INSERT INTO rentals("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        values: [
          rentData.customerId,
          rentData.gameId,
          rentData.rentDate,
          rentData.daysRented,
          rentData.returnDate,
          rentData.originalPrice,
          rentData.delayFee,
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
  
  const findRents = async () => {
    const client = await getClient();
    try {
      const result = await client.query("SELECT * FROM games");
      return result.rows;
    } catch (err) {
      console.error("Error getting games", err);
      throw err;
    } finally {
      await client.end();
    }
  };
  
  const findRentById = async (id) => {
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


module.exports = {
    createRent,
    findRents,
    findRentById,
  };