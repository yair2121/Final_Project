const { MongoClient } = require("mongodb");
let creds = require("./MongoDBCredentials.json");
const uri = `mongodb+srv://roeynehemiapeleg:${creds.password}@cluster0.nuinj.mongodb.net/TestDatabase?retryWrites=true&w=majority`;

var interface_default =
  require("../interfaceConfig").resolvePrecept("IDatabaseModel");

class IDatabaseModel {
  constructor() {}

  // Connects to a collection in database and initialises collection property
  connect() {
    interface_default();
  }

  insertOne() {
    interface_default();
  }

  insertMany() {
    interface_default();
  }

  findOne() {
    interface_default();
  }

  findMany() {
    interface_default();
  }

  updateOne() {
    interface_default();
  }

  updateMany() {
    interface_default();
  }

  deleteOne() {
    interface_default();
  }

  deleteMany() {
    interface_default();
  }
}

module.exports = { IDatabaseModel };
