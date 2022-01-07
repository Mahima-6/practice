const express = require("express");
const app = express();

app.use(express.json());
const cors = require("cors");
app.use(cors());

const { addUser, selectUser } = require("./user");

app.get("/selectUser", async (req, res) => {
  const list = await selectUser();
  res.json(list);
});

app.post("/addUser", async (req, res) => {
  const body = req.body;
  //console.log(body);
  await addUser(body);
  res.json("Hello iam post");
});

app.listen(8000, () => {
  console.log("server started");
});
