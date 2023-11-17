const { Router } = require("express");
const scrape = require("../functions/scrape");
const validator = require("validator");

const router = Router();

router.get("/", async function (req, res, next) {
  const keyword = validator.escape("" + req.query.keyword).trim(); //cleaning input

  if (keyword == "undefined" || !keyword) {
    return res
      .status(400)
      .json(
        "keyword query string required, example query: /api/scrape?keyword=hat"
      );
  }

  scrape(keyword).then((products) => {
    if (!products)
      return res
        .status(400)
        .json(
          "something went wrong when scraping Amazon, contact the developer."
        );
    res.json({
      //returning the data
      keyword,
      products_count: products.length,
      products,
    });
  });
});

module.exports = router;
