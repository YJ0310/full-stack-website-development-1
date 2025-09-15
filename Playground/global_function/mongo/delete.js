import { Mongo } from "./mongo.js";

export class mongo_delete {
  /**
   *
   * @param {Mongo} mongo
   */
  constructor(mongo) {
    this.mongo = mongo;
    this.inquirer = mongo.global.inquirer;
    this.users = mongo.users;
  }

  async delete_one() {
    let selected_data;

    if (
      (await this.inquirer.confirm("Please select a data to delete")) === false
    ) {
      return "Action Canceled";
    }

    selected_data = await this.mongo.find.find_one();

    if (
      (await this.inquirer.confirm("Do you want to delete this data?")) ===
      false
    ) {
      return "Action Canceled";
    }

    try {
      await this.mongo.users.deleteOne({ _id: selected_data._id });
      return "Deleted";
    } catch (error) {
      console.log("Deleted Failed");
      throw error;
    }
  }

  async delete_many() {
    let selected_data_list;

    selected_data_list = await this.mongo.find.find_with_filter();

    let value_in_text = selected_data_list
      .map(({ _id, ...rest }) => Object.values({ ...rest }).toString())
      .join("\n");

    if (
      (await this.inquirer.confirm(
        `Do you want to delete these data?\n${value_in_text}\n`
      )) === false
    ) {
      return "Action Canceled";
    }

    try {
      for (let index = 0; index < selected_data_list.length; index++) {
        const selected_data = selected_data_list[index];
        await this.mongo.users.deleteOne({ _id: selected_data._id });
      }
      return "Deleted";
    } catch (error) {
      console.log("Deleted Failed");
      throw error;
    }
  }

  async delete_all() {
    let all_data = await this.mongo.find.fetch_all();

    let value_in_text = all_data.map(({ _id, ...rest }) =>
      Object.values(...rest).toString()
    );

    if (
      (await this.inquirer.confirm(
        `Do you want to delete all the data?\n${value_in_text}\n`
      )) === false
    ) {
      return "Action Canceled";
    }

   try {
      await this.mongo.users.deleteMany();
      return "Deleted All";
    } catch (error) {
      console.log("Deleted Failed");
      throw error;
    }
  }
}
