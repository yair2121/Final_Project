const { MongoClient } = require("mongodb");
let creds = require("./MongoDBCredentials.json");
const uri = `mongodb+srv://dbReadWriteOnly:${creds.password}@cluster0.sle1ufk.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://roeynehemiapeleg:${creds.password}@cluster0.nuinj.mongodb.net/TestDatabase?retryWrites=true&w=majority`;
const IDatabaseModel = require("./IDatabaseModel").IDatabaseModel;

class ProjectDatabaseModel extends IDatabaseModel {
  constructor() {
    super();
    this.uri = uri;
    this.collection = null;
  }

  static async getCollection(client, db_name, collection_name) {
    try {
      return await client.db(db_name).collection(collection_name);
    } catch (e) {
      console.error(`unable to connect: ${e}`);
    }
  }

  close() {
    this.client.close();
  }
  // Connects to a collection in database and initialises collection property
  async connect(db_name, collection_name) {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await this.client
      .connect()
      .catch((err) => {
        // MongoClient failed to connect
        console.error(err.stack);
        process.exit(1);
      })
      .then(
        await (async (client) => {
          this.collection = await ProjectDatabaseModel.getCollection(
            client,
            db_name,
            collection_name
          );
        })
      );
  }

  insertOne(data) {
    return this.collection.insertOne(data).catch((e) => {
      console.error(`unable to post: ${e}`);
    });
  }

  insertMany(arrayOfData) {
    return this.collection.insertMany(arrayOfData).catch((e) => {
      console.error(`unable to post: ${e}`);
    });
  }

  findOne(query) {
    return this.collection.findOne(query).catch((e) => {
      console.error(`unable to find: ${e}`);
    });
  }

  findMany(query) {
    return this.collection.find(query);
  }

  updateOne(filter, update, options = {}) {
    return this.collection.updateOne(filter, update, options).catch((e) => {
      console.error(`unable to update: ${e}`);
    });
  }

  updateMany(filter, update, options = {}) {
    return this.collection.updateMany(filter, update, options).catch((e) => {
      console.error(`unable to update: ${e}`);
    });
  }

  deleteOne(filter, options = {}) {
    return this.collection.deleteOne(filter, options).catch((e) => {
      console.error(`unable to delete: ${e}`);
    });
  }

  deleteMany(filter, options = {}) {
    return this.collection.deleteMany(filter, options).catch((e) => {
      console.error(`unable to delete: ${e}`);
    });
  }
}

module.exports = { ProjectDatabaseModel };
