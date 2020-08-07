import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  urls: [{ type: String }],
  fileNames: [{ type: String, required: true }],
  amountInStock: { type: Number, required: true },
});

productSchema.methods.creatProductUrls = function creatProductUrls() {
  try {
    const urls = this.fileNames.map((fileName) => {
      return `http://localhost:4000/static/${fileName}`;
    });
    return urls;
  } catch (error) {
    console.log(error);
  }
};
export default mongoose.model("Product", productSchema);
