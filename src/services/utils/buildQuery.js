const buildQuery = (tableName, params) => {
  const { name, offset, limit, order } = params;
  let query = `SELECT * FROM ${tableName}`;
  const values = [];
  let i = 1;

  if (name) {
    query += ` WHERE name ILIKE $${i}`;
    values.push(`%${name}%`);
    i++;
  }

  if (order) {
    query += ` ORDER BY ${order}`;
  }

  if (offset) {
    if (i === 1) {
      query += " WHERE";
    }
    query += ` OFFSET $${i}`;
    values.push(parseInt(offset, 10));
    i++;
  }

  if (limit) {
    query += ` LIMIT $${i}`;
    values.push(parseInt(limit, 10));
  }

  return {
    query,
    values,
  };
};

module.exports = { buildQuery };
