const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Connection to MongoDB
mongoose
  .connect(
    "mongodb+srv://miganson2:oSfIivO2ioli5Sm9@cluster0.ewmbdwr.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Create Schema
const productSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

// Model
const Product = mongoose.model("Product", productSchema);

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

app.post("/products", async (req, res) => {
  const { name, imageUrl } = req.body;
  const product = new Product({ name, imageUrl });
  await product.save();
  res.json(product);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({ message: 'Product deleted successfully' });
});

app.listen(8000, () => console.log("Server is running on port 8000"));
