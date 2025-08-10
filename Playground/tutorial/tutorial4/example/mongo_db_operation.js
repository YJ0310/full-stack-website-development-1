import { Db, MongoClient } from "mongodb";
import { Global_data_generation } from "./example_data_generator.js";
import inquirer from "inquirer";
import { checkbox, select } from "@inquirer/prompts";

const global_data_generation = new Global_data_generation();

export class MongoDB_operation {
  /**
   *
   * @param {String} url
   */
  constructor(url = `mongodb://localhost:27017`) {
    this.url = url;
    this.client = null;
    this.create_operation = new create_operation(this);
    this.find_operation = new find_operation(this);
    this.prompt = new prompt();
  }
  async init() {
    console.log(`Trying to initialize ...`);

    try {
      this.client = new MongoClient(this.url);
      await this.client.connect();
      this.db = await this.client.db(`mongo_db_operation`);
      this.users = await this.db.collection(`users`);
      console.log(`Mongo DB Connected`);
      await this.get_current_data();
      console.log(`Initialized Completed`);
    } catch (error) {
      console.error(error);
    }
  }
  async close() {
    try {
      console.log(`Trying to close the database ...`);
      this.client.close();
      console.log(`Database closed`);
    } catch (error) {
      console.error(error);
    }
  }
  async get_current_data() {
    this.current_data = await this.find_operation.find();
  }
}

class create_operation {
  constructor(parent) {
    /**@type {MongoDB_operation} */
    this.parent = parent;
  }
  async single() {
    console.log(`Trying to create operation ...`);

    await MongoDB_operation.insertOne(
      this.parent.users[
        Math.floor(Math.random() * global_data_generation.data.length)
      ]
    );
    console.log(`Operation Completed`);
  }
  async multiple(amount_of_example_data = 3) {
    console.log(`Trying to create multiple operation ...`);
    let data_set = [];
    for (let index = 0; data_set.length < amount_of_example_data; index++) {
      data_set.push(
        global_data_generation.data.slice(
          Math.floor(Math.random() * global_data_generation.data.length)
        )[0]
      );
      data_set = [...new Set(data_set)];
    }
    await this.parent.users.insertMany(data_set);

    console.log(`Multiple operation completed`);
  }
}

class find_operation {
  constructor(parent) {
    /**@type {MongoDB_operation} */
    this.parent = parent;
    this.prompt = new prompt();
  }
  async init() {
    this.current_data = await this.parent.current_data;
  }
  async ask_conditions() {
    const condition_key = Object.keys(this.current_data[0]).slice(1);
    return this.prompt.prompt(`Please Select Conditions`, condition_key);
  }
  /**
   *
   * @param {string} condition_key
   * @param {WithId<Document>[]} current_selected_data
   */
  async ask_value(condition_key, current_selected_data = this.current_data) {
    const conditions_value = [
      ...new Set(current_selected_data.map((i) => i[condition_key])),
    ];
    return this.prompt.prompt(
      `Please select ${condition_key}`,
      conditions_value
    );
  }
  /**
   *
   * @param {object} conditions
   * @returns
   */
  async find(conditions = {}, specific_fields = {}) {
    //Find all documents
    return this.parent.users
      .find(conditions, { projection: specific_fields })
      .toArray();
  }
  async find_with_conditions() {
    // Ask the users which to find
    const reply_from_user = {};
    reply_from_user.conditions = [];
    reply_from_user.keys = [];

    reply_from_user.conditions.push(await this.ask_conditions());

    reply_from_user.keys.push(
      await this.ask_value(reply_from_user.conditions.at(-1), this.current_data)
    );

    return this.find({
      [reply_from_user.conditions.at(-1)]: reply_from_user.keys.at(-1),
    });
  }
  async find_one_document() {
    const key = await this.ask_conditions();
    const value = await this.ask_value(key);

    return this.parent.users
      .findOne({ [key]: value })
      .then(({ _id, ...rest }) => ({ ...rest }));
  }
  async find_with_asking_select_specific_fields() {
    let value = Object.keys(this.current_data[0]);
    value = value.map((i) => {
      let checked;
      if ([`name`].includes(i)) {
        checked = true;
      }
      return { value: i, checked };
    });
    let answer = await this.prompt.checkbox(
      `Please select the fields you want`,
      value
    );
    answer = Object.fromEntries(answer.map((i) => [i, 1]));

    return this.find({}, answer);
  }
}

class prompt {
  /**
   *
   * @param {string} question
   * @param {string[]} choice
   */
  async prompt(question, choice) {
    const answer = await select({
      message: question,
      choices: choice,
      loop: false,
    });
    return answer;
  }
  async continue() {
    const answer = await select({
      message: `Wanna Continue?`,
      choices: [
        {
          name: `yes`,
          value: false,
        },
        {
          name: `no, i want to stop`,
          value: true,
        },
      ],
      default: `yes`,
    });
    return answer;
  }
  async checkbox(question, choice) {
    return checkbox({
      message: question,
      choices: choice,
      required: true,
      loop: false,
    });
  }
}
