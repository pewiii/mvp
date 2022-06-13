var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
var port = 3000;
var db = require('../database/index');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var sessions = require('express-session');
var auth = require('../auth/index');

var secret = "thisisasecretstring"
var expire = 1000 * 60 * 60 * 24;

app.use(cookieParser());
app.use(sessions({
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: expire
  }
}));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/items', (req, res) => {
  auth.verifySession(req.session.id, req.session.userId)
  .then(() => {
    db.readItems(req.query, req.session.userId)
    .then(items => {
      db.readCats(req.session.userId)
      .then(categories => {
        res.json({categories, items})
      })
    }).catch(err => {
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
    res.sendStatus(401);
  });
});

app.post('/create', (req, res) => {
  auth.verifySession(req.session.id, req.session.userId)
  .then(() => {
    var createFunc = req.body.type === 'addCat' ? db.createCat : db.createItem;
    createFunc(req.body, req.session.userId)
    .then(result => {
      console.log(result);
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err.message);
      res.sendStatus(500);
    });
  }).catch(() => {
    res.sendStatus(401);
  });
});

app.post('/update', (req, res) => {
  auth.verifySession(req.session.id, req.session.userId)
  .then(() => {
    db.updateItem(req.body, req.session.userId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  }).catch(() => {
    res.sendStatus(401);
  });
});

app.post('/delete', (req, res) => {
  auth.verifySession(req.session.id, req.session.userId)
  .then(() => {
    db.remove(req.body, req.session.userId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
    });
  }).catch(() => {
    res.sendStatus(401);
  });
});

app.get('/search', (req, res) => {
  auth.verifySession(req.session.id, req.session.userId)
  .then(() => {
    db.search(req.query, req.session.userId)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      res.sendStatus(500);
      console.error(err);
    });
  }).catch((err) => {
    console.log(err);
    res.sendStatus(401);
  });
});

app.post('/user', (req, res) => {
  if (req.body.createUser) {
    if (req.body.password.length < 5 || req.body.username.length < 4) {
      res.sendStatus(406);
    } else {
    auth.newUser(req.body.username, req.body.password)
    .then(user => {
      db.saveSession(req.session.id, user._id)
      .then(() => {
        req.session.userId = user._id;
        res.send('Login Success');
      });
    }).catch(err => {
      res.sendStatus(409);
    });
    }
  } else {
    console.log('PASSWORD', req.body.password);
    auth.verifyUser(req.body.username, req.body.password)
    .then(user => {
      console.log('LOGIN SUCCESS');
      db.saveSession(req.session.id, user._id)
      .then(() => {
        req.session.userId = user._id;
        res.send('Login Success');
      });
    }).catch(msg => {
      console.log('LOGIN FAIL');
      res.sendStatus(400);
    })
  }
});

app.get('/user', (req, res) => {
  auth.verifySession(req.session.id, req.session.userId)
  .then(() => {
    res.sendStatus(200);
  }).catch((msg) => {
    console.log(msg);
    res.sendStatus(401);
  });
});

app.get('/logout', (req, res) => {
  db.destroySession(req.session.id)
  .then(() => {
    req.session.destroy((err) => {
      res.send('Logout Success');
    });
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
})

app.listen(port, () => {
  console.log('Listening on port:', port);
});
