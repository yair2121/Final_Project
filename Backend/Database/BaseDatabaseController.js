class BaseDatabaseController {
  constructor(dbmodel) {
    this.model = dbmodel;
  }
  ini(db_name, collection_name) {
    return this.model.connect(db_name, collection_name);
  }
  insertOne(data) {
    return this.model.insertOne(data);
  }

  insertMany(data) {
    return this.model.insertMany(data);
  }

  findOne(query) {
    return this.model.findOne(query);
  }

  findMany(query) {
    return this.model.findMany(query);
  }

  updateOne(query, update, options = {}) {
    return this.model.updateOne(query, update, options);
  }

  updateMany(query, update, options = {}) {
    return this.model.updateMany(query, update, options);
  }

  deleteOne(query) {
    return this.model.deleteOne(query);
  }

  deleteMany(query) {
    return this.model.deleteMany(query);
  }

  close() {
    return this.model.close();
  }
}

module.exports = { BaseDatabaseController };
