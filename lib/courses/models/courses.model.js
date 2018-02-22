var util = require('util');

function HomeModel() {}

HomeModel.prototype.welcomeMessage = function(argName) {
  var name = argName || "Stranger";
  return util.format('Hello %s! Welcome to NodeBootstrap!', name);  
};

// Typical CRUD

HomeModel.prototype.find = function(id) {
  var lookupby = id;
  return lookupby; // Fake code to explain the point
  // @TODO
};

HomeModel.prototype.save = function() {
  // @TODO
};

HomeModel.prototype.delete = function() {
  // @TODO
};

module.exports = new HomeModel();