import { client } from "./config/db.js";
const getProductsQuery = "SELECT * FROM products;";

export default async function getProducts(req, res) {
  try {
    const result = await client.query(getProductsQuery);
    console.log("Products fetched:", result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error in getProducts while fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
