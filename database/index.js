const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/inventory');

var itemSchema = mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
  qty: Number,
  unit: String,
  unitQty: Number,
  retain: Boolean,
  category: String
});

var categorySchema = mongoose.Schema({
  name: { type: String, unique: true, required: true},
  color: String
})

var Item = mongoose.model('Item', itemSchema);
var Category = mongoose.model('Category', categorySchema);

var readCats = () => {
  return Category.find();
}

var createCat = (cat) => {
  var newCat = new Category(cat)
  return newCat.save();
}

var deleteCat = () => {

}

var readItems = (category) => {
  console.log()
  var query = {};
  if (category !== 'all') {
    query.category = category;
  }
  return Item.find(query);
}

var createItem = (item) => {
  var newItem = new Item(item);
  return newItem.save();
}

var deleteItem = () => {

}

var updateItem = () => {

}

module.exports = {
  readCats,
  createCat,
  deleteCat,
  readItems,
  createItem,
  deleteItem,
  updateItem
}