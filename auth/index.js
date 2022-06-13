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
      var testPassword = password + user.salt;
      //var hashedPassword = Crypto.createHash('md5', testPassword).digest('hex').toString();
      var hashedPassword = Crypto.createHash('sha256').update(password + user.salt).digest('hex');
      console.log(hashedPassword);
      console.log(user.password);
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
  //var hashedPassword = Crypto.createHash('md5', password + salt).digest('hex').toString();
  var hashedPassword = Crypto.createHash('sha256').update(password + salt).digest('hex');
  return db.createUser(username, salt, hashedPassword);
}

module.exports = {
  verifySession,
  verifyUser,
  newUser
}