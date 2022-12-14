const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const redis = require("redis");
const JWTR = require("jwt-redis").default;

const redisClient = redis.createClient();
// await redisClient.connect();
const jwtr = new JWTR(redisClient);

const { SECRET_KEY_JWT } = process.env;

// (async () => {
//   await redisClient.connect();
// })();

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password wrong");
  }
  if (!user.verify) {
    throw RequestError(401, "Please verify your email");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password wrong");
  }

  const payload = {
    id: user._id,
  };
  console.log(payload);
  await redisClient.connect();
  const token = await jwtr.sign(payload, SECRET_KEY_JWT, { expiresIn: "72h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token });
};

module.exports = login;
