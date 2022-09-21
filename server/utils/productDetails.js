require('dotenv').config();
const axios = require('axios');

const { URL, TOKEN } = process.env;

const getProduct = (req, res, next) => {
  const product_id = req.params[0];

  axios
    .get(`${URL}/products/${product_id}`, {
      headers: {
        Authorization: TOKEN,
      },
    })
    .then((product_info) => {
      console.log('This is the product info: ', product_info.data);

      res.body = product_info.data;
      next();
    })
    .catch(next);
};

module.exports = {
  getProduct,
};
