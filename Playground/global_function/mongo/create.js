import global from "../_manager.js";

/**
 * @typedef {import("./mongo.js").Mongo} Mongo
 */

export class mongo_create {
  /**
   *
   * @param {Mongo} mongo
   */
  constructor(mongo) {
    this.mongo = mongo;
  }
  async create_one(data) {
    await this.mongo.users.insertOne(data);

    return this;
  }

  async create_many(data) {
    await this.mongo.users.insertMany(data);

    return this;
  }
}
