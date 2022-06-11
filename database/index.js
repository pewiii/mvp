const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/inventory');

var sessionSchema = mongoose.Schema({
  session: String,
  userId: String
});

var userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  salt: String,
  password: String
});

var itemSchema = mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  category: String,
  userId: String
});

var categorySchema = mongoose.Schema({
  name: { type: String, required: true},
  itemCount: { type: Number, default: 0 },
  userId: String
})

var Item = mongoose.model('Item', itemSchema);
var Category = mongoose.model('Category', categorySchema);
var User = mongoose.model('User', userSchema);
var Session = mongoose.model('Session', sessionSchema);

var readCats = (userId) => {
  return Category.find({ userId });
}

var createCat = (cat, userId) => {
  cat.userId = userId;
  var newCat = new Category(cat)
  return newCat.save();
}

var readItems = (query, userId) => {
  var category = query.category;
  var id = query.id;
  var query = {};
  if (category !== 'all') {
    query.category = category;
  }
  if (id) {
    return Item.findOne({ _id: id, userId });
  }
  query.userId = userId;
  return Item.find(query);
}

var createItem = (item, userId) => {
  item.userId = userId;
  var newItem = new Item(item);
  return Category.findOne({ name: item.category, userId })
    .then(cat => {
      cat.itemCount++
      return Category.updateOne({ name: item.category, userId }, { itemCount: cat.itemCount })
    })
    .then(() => {
      return newItem.save();
    })
}

var remove = (record, userId) => {
  if (record.type === 'item') {
    return Item.findOne({ _id: record.data._id, userId})
      .then(item => {
        return Category.findOne({ name: item.category, userId});
      })
      .then((category) => {
        category.itemCount--;
        return Category.updateOne({ name: category.name, userId }, category);
      })
      .then(() => {
        return Item.deleteMany({ _id: record.data._id, userId});
      });
  } else if (record.type === 'cat') {
    return Category.remove({ name: record.data.name, userId })
      .then(() => {
        return Item.deleteMany({ category: record.data.name, userId });
      })
  }
}

var updateItem = (updateItem, userId) => {
  updateItem.item.userId = userId
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

var search = (query, userId) => {
  var regex = new RegExp(query.search);
  return Item.find({
    $or:[
          {
            description: {
              $regex: regex,
              $options: 'i'
            }
          },
          {
            name: {
              $regex: regex,
              $options: 'i'
            }
          },
          {
            category: {
              $regex: regex,
              $options: 'i'
            }
          }
        ],
        userId
    });
}

var readSession = (session) => {
  return Session.findOne({ session });
}

var readUser = (username) => {
  return User.findOne({ username });
}

var createUser = (username, salt, password) => {
  var newUser = new User({ username, salt, password });
  return newUser.save();
}

var saveSession = (session, userId) => {
  var newSession = new Session({ session, userId });
  return newSession.save();
}

var destroySession = (session) => {
  return Session.deleteOne({ session });
}

module.exports = {
  readCats,
  createCat,
  remove,
  readItems,
  createItem,
  updateItem,
  search,
  readSession,
  readUser,
  createUser,
  saveSession,
  destroySession
}