const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT = 3001 } = process.env;

const consoleMessage = () => {
  console.log("Wallet server running. Use API on port: 3001");
};

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT, consoleMessage))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
