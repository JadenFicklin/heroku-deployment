require("dotenv").config();
const { PORT, DATABASE_URL } = process.env;
const express = require("express");
const cors = require("cors");
const Sequelize = require("sequelize");

const app = express();

app.use(express.json());
app.use(cors());
//added
app.use(express.static(path.resolve(__dirname, "../build")));

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

//endpoints
app.get("/api/info", async (req, res) => {
  let info = await sequelize.query(`
  SELECT * FROM products
  `);
  res.status(200).send(info[0][0]);
});

//added
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

//npm i sequelize pg pg-hstore axios dotenv express cors
