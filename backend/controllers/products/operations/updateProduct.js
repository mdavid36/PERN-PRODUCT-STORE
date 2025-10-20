import client from "../../../config/db.js";
const updateProductQuery =
  "UPDATE products SET name = $1, price = $2, link = $3 WHERE id = $4 RETURNING *;";
export default async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, price, link } = req.body;

  if (!id) {
    return res
      .status(500)
      .json({ success: false, error: "Product ID is required" });
  }

  try {
    const values = [name, price, link || null, id];
    const result = await client.query(updateProductQuery, values);
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error in updateProduct while updating product:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}
