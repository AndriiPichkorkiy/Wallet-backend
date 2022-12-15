const getDateForNews = () => {
  const date = new Date();
  date.setHours(date.getHours() - 20);
  const ISOdate = date.toISOString();
  const dateSearchParametr = ISOdate.slice(0, ISOdate.length - 5);

  return dateSearchParametr;
};

module.exports = getDateForNews;
