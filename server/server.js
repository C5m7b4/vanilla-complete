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

app.delete("/", (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      res.send({ error: 1, success: false, msg: "missing id" });
      return;
    }
    var sql = require("mssql");
    sql.connect(config, function (err) {
      if (err) console.log(err);

      var request = new sql.Request();
      const query = "delete from items where id=" + id;
      console.log(query);
      request.query(query, function (err) {
        if (err) console.log(err);
        res.send({
          error: 0,
          success: true,
        });
      });
    });
  } catch (error) {
    res.send({ error: 1, success: false, msg: error.message });
  }
});

app.post("/category", (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      res.send({ error: 2, success: false, msg: "Missing name parameter" });
      return;
    }
    console.log(name);

    var sql = require("mssql");
    sql.connect(config, function (err) {
      if (err) console.log(err);

      var request = new sql.Request();
      var query = `insert into categories (name) values ('${name}')`;
      console.log(query);

      request.query(query, function (err, recordset) {
        if (err) console.log(err);

        res.send({
          error: 0,
          success: true,
          data: recordset,
        });
      });
    });
  } catch (error) {
    res.send({ error: 1, success: false, msg: error.message });
  }
});

app.post("/", (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      res.send({ error: 2, success: false, msg: "Missing name parameter" });
      return;
    }
    const size = req.body.size;
    const price = req.body.price;
    const category = req.body.category;
    console.log(name, size, price, category);

    var sql = require("mssql");
    sql.connect(config, function (err) {
      if (err) console.log(err);

      var request = new sql.Request();

      const query = `insert into items (name, size, price, category) values ('${name}','${size}','${price}','${category}')`;
      console.log(query);

      request.query(query, function (err, recordset) {
        if (err) console.log(err);

        res.send({
          error: 0,
          success: true,
          data: recordset,
        });
      });
    });
  } catch (error) {
    res.send({ error: 1, success: false, msg: error.message });
  }
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
