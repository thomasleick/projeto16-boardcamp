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
  if (tableName === "rentals") {
    query = `SELECT 
        rentals.id,
        rentals."customerId",
        rentals."gameId",
        TO_CHAR(rentals."rentDate", 'YYYY-MM-DD') AS "rentDate",
        rentals."daysRented",
        TO_CHAR(rentals."returnDate", 'YYYY-MM-DD') AS "returnDate",
        rentals."originalPrice",
        rentals."delayFee",
        JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer,
        JSON_BUILD_OBJECT('id', games.id, 'name', games.name) AS game
      FROM 
        rentals
      INNER JOIN 
        customers ON rentals."customerId" = customers.id
      INNER JOIN 
        games ON rentals."gameId" = games.id
    `;
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
    } else {
      query += ` AND`;
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
    } else {
      query += ` AND`;
    }
    query += ` "returnDate" IS NOT NULL`;
  }
  if (startDate) {
    if (!hasWhere) {
      query += " WHERE";
      hasWhere = true;
    } else {
      query += ` AND`;
    }
    query += ` "rentDate"::date >= '${startDate}'`;
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

  return {
    query,
    values,
  };
};

module.exports = { buildQuery };
