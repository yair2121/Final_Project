const { MongoClient } = require("mongodb");
let creds = require("./MongoDBCredentials.json");
const uri = `mongodb+srv://dbReadWriteOnly:${creds.password}@cluster0.sle1ufk.mongodb.net/?retryWrites=true&w=majority`;
const IDatabaseModel = require("./IDatabaseModel").IDatabaseModel;

class ProjectDatabaseModel extends IDatabaseModel {
  constructor() {
    super();
    this.uri = uri;
    this.collection = null;
  }

  static getCollection(client, db_name, collection_name) {
    try {
      return client.db(db_name).collection(collection_name);
    } catch (e) {
      console.error(`unable to connect: ${e}`);
    }
  }

  close() {
    this.client.close();
  }
  // Connects to a collection in database and initialises collection property
  connect(db_name, collection_name) {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.collectionPromise = this.client
      .connect()
      .catch((err) => {
        // MongoClient failed to connect
        console.error(err.stack);
        process.exit(1);
      })
      .then((x) => {
        console.log("k");
        return ProjectDatabaseModel.getCollection(
          this.client,
          db_name,
          collection_name
        );
      });
  }

  insertOne(data) {
    return this.collectionPromise.then((collection) =>
      collection.insertOne(data).catch((e) => {
        console.error(`unable to post: ${e}`);
      })
    );
  }

  insertMany(arrayOfData) {
    return this.collectionPromise.then((collection) =>
      collection.insertMany(arrayOfData).catch((e) => {
        console.error(`unable to post: ${e}`);
      })
    );
  }

  findOne(query) {
    return this.collectionPromise.then((collection) =>
      collection.findOne(query).catch((e) => {
        console.error(`unable to find: ${e}`);
      })
    );
  }

  findMany(query) {
    return this.collectionPromise.then((collection) => collection.find(query));
  }

  updateOne(filter, update, options = {}) {
    return this.collectionPromise.then((collection) =>
      collection.updateOne(filter, update, options).catch((e) => {
        console.error(`unable to update: ${e}`);
      })
    );
  }

  updateMany(filter, update, options = {}) {
    return this.collectionPromise.then((collection) =>
      collection.updateMany(filter, update, options).catch((e) => {
        console.error(`unable to update: ${e}`);
      })
    );
  }

  deleteOne(filter, options = {}) {
    return this.collectionPromise((collection) =>
      this.collection.deleteOne(filter, options).catch((e) => {
        console.error(`unable to delete: ${e}`);
      })
    );
  }

  deleteMany(filter, options = {}) {
    return this.collectionPromise((collection) =>
      collection.deleteMany(filter, options).catch((e) => {
        console.error(`unable to delete: ${e}`);
      })
    );
  }
}

module.exports = { ProjectDatabaseModel };
