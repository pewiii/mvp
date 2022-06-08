const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/inventory');

var itemSchema = mongoose.Schema({
  name: String,
  description: String,
  qty: Number,
  unit: String,
  unitQty: Number,
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
      return Category.updateOne({ name: item.category }, { itemCount: cat.itemCount })
    })
    .then(() => {
      return newItem.save();
    })

  // return newItem.save();
}

var remove = (record) => {
  if (record.type === 'item') {
    return Item.findOne({ _id: record._id })
      .then(item => {
        return Category.findOne({ name: item.category });
      })
      .then((category) => {
        category.itemCount--;
        return Category.updateOne({ name: category.name }, category);
      })
      .then(() => {
        return Item.remove({ _id: record._id });
      });
  } else if (record.type === 'category') {
    return Category.remove({ name: record.name });
  }
}

var updateItem = (updateItem) => {
  return Item.findOne(updateItem.item)
    .then(item => {
      if (updateItem.operation === 'add') {
        item.unitQty += Number(updateItem.qty);
      } else if(updateItem.operation === 'subtract') {
        item.unitQty -= Number(updateItem.qty);
      } else if(updateItem.operation === 'overwrite') {
        item.unitQty = Number(updateItem.qty);
      }
      return Item.updateOne({ _id: item._id }, item)
    })
}

module.exports = {
  readCats,
  createCat,
  remove,
  readItems,
  createItem,
  updateItem
}