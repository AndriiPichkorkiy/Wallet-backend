const { default: axios } = require("axios");
const fs = require("fs");
const path = require("path");
const getDateForNews = require("../../helpers/news/getDate");

const { NEWS_URL, NEWS_API_KEY } = process.env;
const pathToNews = path.join("data", "/news.jso");

const timeStampDifference = 1200000; // 20 minutes
const instance = axios.create({
  baseURL: NEWS_URL,
});

const get = async (req, res, next) => {
  try {
    // read news from local
    const oldNews = JSON.parse(fs.readFileSync(pathToNews));

    // check timing
    if (oldNews.timeStamp + timeStampDifference > Date.now()) {
      res.json(oldNews.data);
      return;
    }
    throw Error();
  } catch (Error) {
    // if news very old - load new
    const response = await instance.get(
      `?exchanges=CCY&filter_entities=true&limit=10&published_after=${getDateForNews()}&api_token=${NEWS_API_KEY}`,
      {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      }
    );

    const news = {
      data: response.data.data,
      timeStamp: Date.now(),
    };

    fs.writeFileSync(pathToNews, JSON.stringify(news));
    res.json(response.data.data);
  }
};

module.exports = get;
