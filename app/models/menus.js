import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemId: { type: String },
  name: { type: String },
  price: { type: Number },
  ml: { type: Number },
  img: { type: String },
  description: { type: String },
});

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., 'Lata', 'Garrafa'
  items: [itemSchema],                    // array of items within this subcategory
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., 'Bebidas Alcoólicas', 'Entradas'
  subCategory: [subCategorySchema],     // array of subcategories within this category
});

const menuSchema = new mongoose.Schema({
  quioskeName: { type: String, required: true },
  category: [categorySchema],           // array of categories
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  menuName: { type: String }
});

const Menu = mongoose.models.Menu || mongoose.model('Menu', menuSchema);
export default Menu;
