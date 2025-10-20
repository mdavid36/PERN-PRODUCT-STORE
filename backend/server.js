import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import client from "./config/db.js";
import { getProducts } from "./controllers/products/productController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(morgan("dev")); // Request logging
app.use(express.json()); // Parse JSON request bodies

app.use("/api", productRoutes);

app.get("/", getProducts); // proof it works for now.

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
