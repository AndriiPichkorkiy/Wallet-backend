const { User } = require("../../models/user");
const redis = require("redis");
const JWTR = require("jwt-redis").default;
const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);

const { SECRET_KEY_JWT } = process.env;

// async function startRedis() {
//   await redisClient.connect();
// }
// startRedis();

const logout = async (req, res, next) => {
  await redisClient.connect();
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: "" });
  console.log(user);

  const payload = {
    id: user._id,
  };
  jwtr
    .sign(payload, SECRET_KEY_JWT, { expiresIn: "72h" })
    .then(function (token) {
      console.log("token", token);
    })
    .catch(function (err) {
      throw new Error(err.message);
    });

  await jwtr.destroy(_id);
  res.json({
    message: "Logout success",
  });
};

module.exports = logout;
