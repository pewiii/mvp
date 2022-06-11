var Crypto = require('crypto');
var db = require('../database/index');

var verifySession = (session, userId) => {
  return new Promise((resolve, reject) => {
    db.readSession(session)
    .then(session => {
      if (session.userId === userId) {
        resolve(session);
      } else {
        reject('Invalid User');
      }
    }).catch(err => {
      console.log(err);
      reject('Invalid User');
    });
  });
}

var verifyUser = (username, password) => {
  return new Promise((resolve, reject) => {
    db.readUser(username)
    .then(user => {
      var hashedPassword = Crypto.createHash('md5', password + user.salt).digest('hex').toString();
      if (hashedPassword === user.password) {
        resolve(user);
      } else {
        reject();
      }
    }).catch(err => {
      reject();
    });
  });
}

var newUser = (username, password) => {
  var salt = Crypto.randomBytes(16).toString('hex');
  var hashedPassword = Crypto.createHash('md5', password + salt).digest('hex').toString();
  return db.createUser(username, salt, hashedPassword);
}

module.exports = {
  verifySession,
  verifyUser,
  newUser
}