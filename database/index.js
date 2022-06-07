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
  itemCount: { type: Number, default: 0 }
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
  return Category.findOne({ name: item.category })
    .then(cat => {
      console.log(cat);
      cat.itemCount++
      return Category.update({ name: item.category }, { itemCount: cat.itemCount })
    })
    .then(() => {
      return newItem.save();
    })

  // return newItem.save();
}

var remove = (record) => {
  if (record.type === 'item') {
    return Item.findOne({ name: record.name })
      .then(item => {
        return Category.findOne({ name: item.category });
      })
      .then((category) => {
        category.itemCount--;
        return Category.update({ name: category.name }, category);
      })
      .then(() => {
        return Item.remove({ name: record.name });
      });
  } else if (record.type === 'category') {
    return Category.remove({ name: record.name });
  }
}

var updateItem = () => {

}

module.exports = {
  readCats,
  createCat,
  remove,
  readItems,
  createItem,
  updateItem
}