const express = require("express");
const { functionTest } = require("./controllers/billings");
const { signin, signup } = require("./controllers/users");
const { checkSignin } = require("./middlewares/checkSignin");

const rotas = express();

rotas.post("/signin", signin);
rotas.post("/signup", signup);

rotas.use(checkSignin);

rotas.get("/test", async (req, res) => {
  return res.json("voce esta logado");
});

module.exports = rotas;
