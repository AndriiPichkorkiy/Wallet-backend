const getCurrent = async (req, res, next) => {
  const { name, email } = req.user;
  res.json({ name, email });
};

module.exports = getCurrent;
