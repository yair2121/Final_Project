const { MongoClient } = require("mongodb");
let creds = require("./MongoDBCredentials.json");
const uri = `mongodb+srv://roeynehemiapeleg:${creds.password}@cluster0.nuinj.mongodb.net/TestDatabase?retryWrites=true&w=majority`;
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

  // Connects to a collection in database and initialises collection property
  async connect(db_name, collection_name) {
    console.log("PDM connect called");
    await new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .connect()
      .catch((err) => {
        // MongoClient failed to connect
        console.error(err.stack);
        process.exit(1);
      })
      .then(async (client) => {
        console.log("PDM connected");
        this.collection = await ProjectDatabaseModel.getCollection(
          client,
          db_name,
          collection_name
        );
        console.log("done");
      });
  }

  async addData(data) {
    try {
      return this.collection.insertOne(data);
    } catch (e) {
      console.error(`Unable to post: ${e}`);
      return { error: e };
    }
  }
}

module.exports = { ProjectDatabaseModel };
