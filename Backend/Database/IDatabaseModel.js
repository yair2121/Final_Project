const { MongoClient } = require("mongodb");
let creds = require("./MongoDBCredentials.json");
const uri = `mongodb+srv://roeynehemiapeleg:${creds.password}@cluster0.nuinj.mongodb.net/TestDatabase?retryWrites=true&w=majority`;

var interface_default =
  require("../interfaceConfig").resolvePrecept("IDatabaseModel");

class IDatabaseModel {
  constructor(db_name, collection_name) {}

  // Connects to a collection in database and initializes collection property
  connect() {
    interface_default();
  }

  insertOne(data) {
    interface_default();
  }

  insertMany(data) {
    interface_default();
  }

  findOne(query) {
    interface_default();
  }

  findMany(query) {
    interface_default();
  }

  updateOne(filter, update) {
    interface_default();
  }

  updateMany(filter, update) {
    interface_default();
  }

  deleteOne(filter) {
    interface_default();
  }

  deleteMany(filter) {
    interface_default();
  }
}

module.exports = { IDatabaseModel };
