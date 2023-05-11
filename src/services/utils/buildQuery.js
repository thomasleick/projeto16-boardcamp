const buildQuery = (tableName, params) => {
  const { name, cpf, customerId, gameId, offset, limit, order } = params;
  let query = `SELECT * FROM ${tableName}`;
  if (tableName === "customers")
   query = `SELECT *, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers`
  const values = [];
  let i = 1;

  if (name) {
    query += ` WHERE name ILIKE $${i}`;
    values.push(`%${name}%`);
    i++;
  }
  if (cpf) {
    query += ` WHERE cpf ILIKE $${i}`;
    values.push(`%${cpf}%`);
    i++;
  }
  if (customerId) {
    query += ` WHERE "customerId" = $${i}`;
    values.push(parseInt(customerId, 10));
    i++;
  }

  if (gameId) {
    if (i === 1) {
      query += " WHERE";
    }
    query += ` "gameId" = $${i}`;
    values.push(parseInt(gameId, 10));
    i++;
  }

  if (order) {
    query += ` ORDER BY ${order}`;
  }

  if (offset) {
    query += ` OFFSET $${i}`;
    values.push(parseInt(offset, 10));
    i++;
  }

  if (limit) {
    query += ` LIMIT $${i}`;
    values.push(parseInt(limit, 10));
  }

  console.log(query)
  console.log(values)
  return {
    query,
    values,
  };
};

module.exports = { buildQuery };
