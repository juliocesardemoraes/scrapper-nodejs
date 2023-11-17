const axios = require("axios");
const cheerio = require("cheerio");
const browserHeaders = require("../object/browserHeaders");
const slug = require("../helpers/slug");
// const readFromFile = require('./readFromFile')
// const writeToFile = require('./writeFromFile')

const BASE_URL = "https://www.amazon.com/s?k=";
const options = {
  headers: browserHeaders,
};
const selectors = {
  products: "[data-component-type=s-search-result]",
  title:
    "a.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal span.a-color-base.a-text-normal",
  rating: "span.a-icon-alt",
  reviews: "span.a-size-base.s-underline-text",
  image: "img.s-image",
};

async function fetchPage(keyword) {
  try {
    let res = await axios.get(BASE_URL + keyword, options);
    return res; //return false to test amazon error response
  } catch (err) {
    console.log(err);
    return false;
  }

  // FOR CACHE FILES
  // const filename = `cache/${slug(path)}.html`;

  // const promiseCallback = async (resolve, reject) => {

  //     const cachedHtml = await readFromFile(filename);
  //     if(!cachedHtml){
  //         const html = await getPage(path);
  //         writeToFile(html, filename);
  //         resolve(html)
  //         return
  //     }
  //         resolve(cachedHtml)

  // }

  // return new Promise(promiseCallback)
}

function constructCards($, productCards) {
  const products = [];
  const results = $(selectors.products);
  results.each((index, results) => {
    products[index] = {
      title: $(results).find(selectors.title).text(),
      rating: $(results).find(selectors.rating).text(),
      reviews: $(results).find(selectors.reviews).text(),
      image: $(results).find(selectors.image).attr("src"),
    };
  });
  return products;
}

async function scrape(keyword) {
  await fetchPage(keyword).then((response) => {
    const $ = cheerio.load(response.data);
    const productCards = $(selectors.products);
    products = constructCards($, productCards);
  });
  return products;
}

module.exports = scrape;
