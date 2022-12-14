const getCurrent = async (req, res, next) => {
  const { name, email, avatar } = req.user;
  res.json({ name, email, avatar });
};

module.exports = getCurrent;
