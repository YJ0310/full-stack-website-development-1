import { Mongo } from "./mongo.js";

export class mongo_update {
  /**
   *
   * @param {Mongo} mongo
   */
  constructor(mongo) {
    this.mongo = mongo;
    this.global = mongo.global;
    this.inquirer = mongo.global.inquirer;
    this.users = mongo.users;
  }
  async update_one() {
    let value = {};
    let data = await this.mongo.find.fetch_all();

    value.old = await this.mongo.find.find_one();

    value.key = await this.global.inquirer.select(
      "Select a data you want to edit:",
      Object.keys(data.at(0)).slice(1)
    );

    value.value = await this.inquirer.input("Insert new value:");

    try {
      await this.mongo.users.updateOne(
        { _id: value.old._id },
        { $set: { [value.key]: value.value } }
      );

      console.log("Update completed");

      await this.inquirer.confirm("Press any key to continue");
    } catch (error) {
      console.error(error);

      this.inquirer.confirm();
    }

    return value;
  }

  async update_many() {
    let data = await this.mongo.find.find_with_filter();

    let update_field = await this.inquirer.checkbox(
      "Please select field to update",
      Object.keys(data.at(0)).slice(1)
    );

    let update_value = [];

    for (let index = 0; index < update_field.length; index++) {
      const element = update_field[index];

      update_value = [
        ...update_value,
        await this.inquirer.input(
          `Current field: ${update_field[index]}\nInsert value you want to update`
        ),
      ];
    }

    if ((await this.inquirer.confirm("Do you want to update?")) === false) {
      return "Action Canceled";
    }

    for (let index = 0; index < update_field.length; index++) {
      const element = update_field[index];

      for (let i = 0; i < data.length; i++) {
        await this.mongo.users.updateOne(
          { _id: data[i]._id },
          { $set: { [update_field[index]]: update_value[index] } }
        );
      }
    }

    return "Done";
  }
}
