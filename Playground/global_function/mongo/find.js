import global from "../_manager.js";

export class mongo_find {
  /**
   *
   * @param {import("./create.js").Mongo} mongo
   */
  constructor(mongo) {
    this.mongo = mongo;
    this.inquirer = this.mongo.global.inquirer;
  }

  async fetch_all() {
    return this.mongo.users.find().toArray();
  }

  async find_with_filter() {
    let keys;
    let data = await this.mongo.find.fetch_all();
    let filtered_data = data;
    let values = [[]];

    keys = await this.inquirer.checkbox(
      "Please select filter keys",
      Object.keys(data.at(0)).slice(1)
    );

    for (let index = 0; index < keys.length; index++) {
      if (data.length == 0) {
        return [];
      }

      if (data.length == 1) {
        return data;
      }

      const element = keys[index];
      values = await [
        ...values,
        await this.inquirer.checkbox(
          "Select values",
          [...new Set(data.map((i) => i[element]))].sort()
        ),
      ];

      if (values.at(-1).length < 1) {
        values.pop();
        values = await [
          ...values,
          [...new Set(data.map((i) => i[element]).sort())],
        ];
      }

      data = data.filter((i) => values.at(-1).includes(i[element]));

      filtered_data = data;
    }

    return filtered_data;
  }

  async find_one() {
    let data = await global.inquirer.select(
      "Select a data you want",
      (
        await this.find_with_filter()
      ).map((i) => ({
        name: Object.values(i).slice(1).join(" | "),
        value: i,
      }))
    );
    let result = await this.mongo.users.findOne({ _id: data._id });
    return result;
  }

  async fetch_all_for_print() {
    return (await this.fetch_all())
      .map(({ _id, ...rest }) => Object.values(rest).join(" | "))
      .join("\n");
  }
}
