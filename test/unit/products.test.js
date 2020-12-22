const productController = require("../../controller/products");
const productModel = require("../../models/Product");
const httpMocks = require("node-mocks-http");
const newProduct = require("../data/new-product.json");

productModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  // request, response 객체를 얻기 위해 node-mocks-http 모듈을 사용.
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Product Controller Create", () => {
  beforeEach(() => {
    // newProduct: 미리 정의 해둔 더미 데이터
    req.body = newProduct;
  });

  it("have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });
  it("call ProductModel.create", () => {
    productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });
  it("return 201 response code", async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("return json body in response", async () => {
    productModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });
  it("handle errors", async () => {
    const errorMessage = { message: "description property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
