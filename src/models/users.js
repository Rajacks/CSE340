import db from "./db.js";

const createUser = async (name, email, passwordHash) => {
  const sql = `
    INSERT INTO users (name, email, password_hash, role_id)
    VALUES (
      $1,
      $2,
      $3,
      (SELECT role_id FROM roles WHERE role_name = 'user')
    )
    RETURNING user_id, name, email, role_id;
  `;

  const values = [name, email, passwordHash];

  const result = await db.query(sql, values);

  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const sql = `
    SELECT user_id, name, email, password_hash, role_id
    FROM users
    WHERE email = $1;
  `;

  const values = [email];

  const result = await db.query(sql, values);

  return result.rows[0];
};

export { createUser, getUserByEmail };
