const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var config = {
  user: "express",
  password: "express",
  database: "express",
  server: "C5Laptop",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

app.get("/products", (req, res) => {
  try {
    var sql = require("mssql");

    sql.connect(config, function (err) {
      if (err) console.log(err);

      var request = new sql.Request();

      request.query(
        "select items.id, items.name, size, price, categories.name as category " +
          "from items " +
          "left join categories on items.category = categories.id",
        function (err, recordset) {
          if (err) console.log(err);

          res.send({ error: 0, success: true, data: recordset.recordset });
        }
      );
    });
  } catch (error) {
    res.send({ error: 1, success: false, msg: error.message });
  }
});

app.get("/categories", (req, res) => {
  try {
    var sql = require("mssql");

    sql.connect(config, function (err) {
      if (err) console.log(err);

      var request = new sql.Request();

      request.query(
        "select * from categories order by name",
        function (err, recordset) {
          if (err) console.log(err);

          res.send({ error: 0, success: true, data: recordset.recordset });
        }
      );
    });
  } catch (error) {
    res.send({ error: 1, success: false, msg: error });
  }
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
