var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
var port = 3000;
var db = require('../database/index');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/items', (req, res) => {
  console.log(req.query.category);
  db.readItems(req.query.category)
  .then(items => {
    db.readCats()
    .then(categories => {
      res.json({categories, items})
    })
  })
});

app.post('/create', (req, res) => {
  var createFunc = req.body.type === 'addCat' ? db.createCat : db.createItem;
  createFunc(req.body)
  .then(result => {
    console.log(result);
    res.sendStatus(201);
  })
  .catch(err => {
    console.error(err.message);
    res.sendStatus(500);
  })
});

app.post('/update', (req, res) => {
  console.log(req.body);
  db.updateItem(req.body)
  .then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  })
});

app.post('/delete', (req, res) => {
  console.log(req.body);
  db.remove(req.body)
  .then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.error(err.message);
    res.sendStatus(500);
  })
});

app.get('/search', (req, res) => {
  db.search(req.query)
  .then(results => {
    console.log(results);
    res.json(results);
  })
  .catch(err => {
    res.sendStatus(500);
    console.error(err);
  });
});

app.listen(port, () => {
  console.log('Listening on port:', port);
});