class BaseDatabaseController {
  constructor(dbmodel, db_name, collection_name) {
    this.model = dbmodel;
    dbmodel.connect(db_name, collection_name);
  }

  upload(data) {
    return this.model.insertOne(data);
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
    return this.model.updateMany(query, update, otpions);
  }

  deleteOne(query) {
    return this.model.deleteOne(query);
  }

  deleteMany(query) {
    return this.model.deleteMany(query);
  }
}

module.exports = { BaseDatabaseController };
