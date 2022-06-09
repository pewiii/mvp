const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/inventory');

var itemSchema = mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
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
    return Item.findOne({ _id: record.data._id })
      .then(item => {
        return Category.findOne({ name: item.category });
      })
      .then((category) => {
        category.itemCount--;
        return Category.updateOne({ name: category.name }, category);
      })
      .then(() => {
        return Item.deleteMany({ _id: record.data._id });
      });
  } else if (record.type === 'cat') {
    return Category.remove({ name: record.data.name })
      .then(() => {
        return Item.deleteMany({ category: record.data.name });
      })
  }
}

var updateItem = (updateItem) => {
  return Item.findOne(updateItem.item)
    .then(item => {
      if (updateItem.operation === 'add') {
        item.quantity += Number(updateItem.qty);
      } else if(updateItem.operation === 'subtract') {
        item.quantity -= Number(updateItem.qty);
      } else if(updateItem.operation === 'overwrite') {
        item.quantity = Number(updateItem.qty);
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