const buildQuery = (tableName, params) => {
  const {
    name,
    cpf,
    customerId,
    gameId,
    offset,
    limit,
    order,
    desc,
    status,
    startDate,
  } = params;
  let query = `SELECT * FROM ${tableName}`;

  if (tableName === "customers") {
    query = `SELECT id, name, phone, cpf, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers`;
  }

  const values = [];
  let i = 1;
  let hasWhere = false;

  if (name) {
    query += ` WHERE name ILIKE $${i}`;
    values.push(`%${name}%`);
    i++;
    hasWhere = true;
  }
  if (cpf) {
    query += ` WHERE cpf ILIKE $${i}`;
    values.push(`%${cpf}%`);
    i++;
    hasWhere = true;
  }
  if (customerId) {
    query += ` WHERE "customerId" = $${i}`;
    values.push(parseInt(customerId, 10));
    i++;
    hasWhere = true;
  }

  if (gameId) {
    if (!hasWhere) {
      query += " WHERE";
      hasWhere = true;
    }
    else {
      query += ` AND`
    }
    query += ` "gameId" = $${i}`;
    values.push(parseInt(gameId, 10));
    i++;
    
  }

  if (order) {
    query += ` ORDER BY "${order}"`;
    if (desc === "true") {
      query += ` DESC`;
    }
  }

  if (status === "open") {
    if (!hasWhere) {
      query += " WHERE";
      hasWhere = true;
    }
    query += ` "returnDate" IS NULL`;

  }
  if (status === "closed") {
    if (!hasWhere) {
      query += " WHERE";
      hasWhere = true;
    }
    else {
      query += ` AND`
    }
    query += ` "returnDate" IS NOT NULL`;
  }
  if (startDate) {
    if (!hasWhere) {
      query += " WHERE";
      hasWhere = true;
    }
    else {
      query += ` AND`
    }
    query += ` "rentDate"::date >= '${startDate}'`
  }
  if (offset) {
    query += ` OFFSET $${i}`;
    values.push(parseInt(offset, 10));
    i++;
  }

  if (limit) {
    query += ` LIMIT $${i}`;
    values.push(parseInt(limit, 10));
    i++;
  }
  console.log(query);
  console.log(values);

  return {
    query,
    values,
  };
};

module.exports = { buildQuery };
