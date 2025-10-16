function getProducts(req, res) {
  res.json({ message: "Get all products" });
}

function createProduct(req, res) {
  res.json({ message: "Create a product" });
}
export { getProducts, createProduct };
