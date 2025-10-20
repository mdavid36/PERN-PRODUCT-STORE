import client from "../../../config/db.js";
const updateProductQuery =
  "UPDATE products SET name = COALESCE(NULLIF($2, ''), name), price = COALESCE(NULLIF($3, ''), price), link = COALESCE(NULLIF($4, ''), link) WHERE id = $1 RETURNING *;";
export default async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, price, link } = req.body;

  if (!id) {
    return res
      .status(500)
      .json({ success: false, error: "Product ID is required" });
  }

  try {
    const values = [id, name, price, link || null];
    const result = await client.query(updateProductQuery, values);
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error in updateProduct while updating product:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}
