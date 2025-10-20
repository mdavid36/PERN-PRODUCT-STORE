import client from "../../../config/db.js";

const insertQuery =
  "INSERT INTO products (name, price, link) VALUES ($1, $2, $3) RETURNING *;";

export default async function createProduct(req, res) {
  const { name, price, link } = req.body;

  if (!name || !price) {
    return res
      .status(400)
      .json({ success: false, error: "Name and price are required" });
  }
  try {
    const values = [name, price, link || null];
    const result = await client.query(insertQuery, values);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error in createProduct while creating product:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}
