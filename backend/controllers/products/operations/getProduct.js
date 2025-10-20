import client from "../../../config/db.js";

const getProductQuery = "SELECT * FROM products WHERE id = $1 RETURNING *;";
export default async function getProduct(req, res) {
  const { id } = req.params;
  if (!id) {
    return res
      .status(500)
      .json({ success: false, error: "Product ID is required" });
  }
  try {
    const result = await client.query(getProductQuery, [id]);
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error in getProduct while fetching product:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}
