import dotenv from "dotenv";


dotenv.config({ path: "./env" });
console.log(process.env.DB_LOCAL_DBNAME)

export default  {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
    database: process.env.DB_LOCAL_DBNAME,
    charset: "utf8"
  },
};




