const { getClient } = require("./utils/db");

const createCustomer = async (customerData) => {
  const client = await getClient();
  try {
    const result = await client.query({
      text: "INSERT INTO customers(name, phone, cpf, birthday) VALUES($1, $2, $3, $4) RETURNING *",
      values: [
        customerData.name,
        customerData.phone,
        customerData.cpf,
        customerData.birthday,
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

const findCustomers = async () => {
  const client = await getClient();
  try {
    const result = await client.query("SELECT * FROM customers");
    return result.rows;
  } catch (err) {
    console.error("Error getting customers", err);
    throw err;
  } finally {
    await client.end();
  }
};

const findCustomerById = async (id) => {
  const client = await getClient();
  try {
    const result = await client.query("SELECT * FROM customers WHERE id=$1", [id]);
    return result.rows[0];
  } catch (err) {
    console.error("Error getting customer", err);
    throw err;
  } finally {
    await client.end();
  }
};
const findCustomerByCpf = async (id) => {
    const client = await getClient();
    try {
      const result = await client.query("SELECT * FROM customers WHERE cpf=$1", [id]);
      return result.rows[0];
    } catch (err) {
      console.error("Error getting customer", err);
      throw err;
    } finally {
      await client.end();
    }
  };

  const editCustomer = async (customerId, newData) => {
    const client = await getClient();
    try {
      const result = await client.query({
        text: "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5 RETURNING *",
        values: [
          newData.name,
          newData.phone,
          newData.cpf,
          newData.birthday,
          customerId,
        ],
      });
  
      return result.rows[0];
    } catch (err) {
      console.error("Error updating customer", err);
      throw err;
    } finally {
      await client.end();
    }
  };

module.exports = {
  createCustomer,
  findCustomers,
  findCustomerById,
  findCustomerByCpf,
  editCustomer
};
