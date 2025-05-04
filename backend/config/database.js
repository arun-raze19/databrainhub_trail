import { Sequelize } from "sequelize";

const db = new Sequelize(
  'bsi9av994zvumhyngzth', // database name
  'umlxas4rhxrkqqu5',     // username
  'Fwknrgb8U0AHS8kdP0o0', // password
  {
    host: "bsi9av994zvumhyngzth-mysql.services.clever-cloud.com",
    dialect: "mysql",
    port: 3306,
    logging: false,
  }
);

(async () => {
  try {
    await db.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default db;
