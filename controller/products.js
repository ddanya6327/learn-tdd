const productModel = require("../models/Product");

exports.createProduct = async (req, res, next) => {
  try {
    const createProduct = await productModel.create(req.body);
    res.status(201).json(createProduct);
  } catch (error) {
    // 비동기 에러 처리를 위해 next에 담는다.
    next(error);
  }
};
