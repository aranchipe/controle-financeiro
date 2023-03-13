const express = require("express");
const { registerBilling, listBillings } = require("./controllers/billings");
const { signin, signup } = require("./controllers/users");
const { checkSignin } = require("./middlewares/checkSignin");

const rotas = express();

rotas.post("/signin", signin);
rotas.post("/signup", signup);

rotas.use(checkSignin);

rotas.post("/registros", registerBilling);
rotas.get("/registros", listBillings);

module.exports = rotas;
