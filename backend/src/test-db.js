import { pool } from "./config/db.js";

const testConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log(result.rows);

    process.exit(0);

  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

testConnection();