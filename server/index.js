const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3002;
const mySql = require("mysql");

const createIdDB = mySql.createPool({
  host: "localhost",
  user: "root",
  password: "Jogyewon6372!",
  database: "cinema-project",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/Create/get", (req, res) => {
  const sqlInsertGet = "SELECT * FROM `cinema-project`.createid";
  createIdDB.query(sqlInsertGet, (err, result) => {
    res.send(result);
  });
});

app.post("/Create/insert", (req, res) => {
  const serverCreateName = req.body.createName;
  const serverCreateId = req.body.createId;
  const serverCreatePass = req.body.createPass;

  const sqlInsert =
    "INSERT INTO createid (name, id, password) VALUES (?, ?, ?) ";
  createIdDB.query(
    sqlInsert,
    [serverCreateName, serverCreateId, serverCreatePass],
    (err, result) => {
      console.log(result);
    }
  );
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
