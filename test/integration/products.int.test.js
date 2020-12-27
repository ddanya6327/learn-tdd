const request = require("supertest");
const app = require("../../server");
const newProduct = require("../data/new-product.json");

let firstProduct;
it("POST /api/products", async () => {
  const response = await request(app).post("/api/products").send(newProduct);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
  expect(response.body.price).toBe(newProduct.price);
});

it("return 500 on POST /api/products", async () => {
  const response = await request(app)
    .post("/api/products")
    .send({ name: "yang" });
  expect(response.statusCode).toBe(500);
  expect(response.body).toStrictEqual({
    message:
      "Product validation failed: description: Path `description` is required.",
  });
});

it("GET /api/products", async () => {
  const response = await request(app).get("/api/products");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0]
});

it("GET /api/products/:productId", async() => {
  const response = await request(app).get(`/api/products/${firstProduct._id}`);
  expect(response.statusCode).toBe(200)
  expect(response.body.name).toBe(firstProduct.name)
  expect(response.body.description).toBe(firstProduct.description)
})

it("GET id doenst exist /api/products/:productId", async () => {
  const response = await request(app).get('/api/products/5fe1da6e715bc436c8b8aaaa')
  expect(response.statusCode).toBe(404)
})
