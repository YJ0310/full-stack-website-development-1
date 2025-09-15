import global from "../_manager.js";
import { BSONType, MongoClient } from "mongodb";
import { mongo_create } from "./create.js";
import { mongo_find } from "./find.js";
import { mongo_update } from "./update.js";
import { mongo_delete } from "./delete.js";

/**
 * @class
 */
export class Mongo {
  constructor(
    url = `mongodb://localhost/takoo/test`,
    dbName = `Project`,
    collectionName = `default`
  ) {
    this.client = new MongoClient(url);

    this.dbName = dbName;

    this.collectionName = collectionName;

    this.global = global;

    this.create = new mongo_create(this);

    this.find = new mongo_find(this);

    this.update = new mongo_update(this);

    this.delete = new mongo_delete(this);
  }

  async connect() {
    console.log(`Trying to connect the server`);

    await this.client.connect();

    console.log(`Connect successfully to the server`);

    this.db = await this.client.db(this.dbName);

    this.users = await this.db.collection(this.collectionName);

    this.person_collection = await this.db.createCollection("person", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["Name"],
          properties: {
            _id: {
              bsonType: "string",
              description: "The id of the data",
            },
            Name: {
              bsonType: "string",
              description: "Name must be a string and is a required field.",
            },
            Birth: {
              bsonType: "int",
              description: "Birth must be an integer (year). ",
            },
            Age: {
              bsonType: "int",
              description: "Age must be an integer. ",
            },
            Place: {
              bsonType: "string",
              description: "Place must be a string. ",
            },
            University: {
              bsonType: "string",
              description: "University must be a string. ",
            },
            Pre_University: {
              bsonType: "string",
              description: "Pre_University must be a string. ",
            },
            Tel_Number: {
              bsonType: "string",
              description: "Tel_Number must be a string.",
            },
            Single: {
              bsonType: "bool",
              description: "Single must be a boolean (TRUE or FALSE)",
            },
          },
        },
      },
    });

    this.users = this.db.collection("person")

    return this;
  }

  async close() {
    await this.client.close();

    console.log("Server closed");
    return this;
  }

  async reset_the_data() {
    let data = await (await new this.global.data().get_example_data())
      .auto_fill_tel_number()
      .converted_data.sort((a, b) => a.Name.localeCompare(b.Name));

    await this.users.deleteMany();
    await this.users.insertMany(data);

    console.log("Data Reset");
    await this.global.inquirer.press_any_key_to_continue();

    return this.find.fetch_all_for_print();
  }

  async reset_the_new_data() {
    let data = [
      await this.global.New_Example_Data.init_person(),
      await this.global.New_Example_Data.init_university(),
      await this.global.New_Example_Data.init_pre_u(),
    ];

    for (
      let index = 0;
      index < ["person", "university", "pre-u"].length;
      index++
    ) {
      let temp_collection = await this.db.collection(
        ["person", "university", "pre-u"].at(index)
      );

      await temp_collection.deleteMany();

      await temp_collection.insertMany(data.at(index));
    }

    return "Data Reset";
  }

  /**
   *
   * @param {Mongo} mongo
   * @returns
   */
  async menu() {
    let value;
    let selected_value;

    value = {
      // "reset data": this.reset_the_data.bind(this),
      "reset data": this.reset_the_new_data.bind(this),
      find: {
        "find one": this.find.find_one.bind(this.find),
        "find many": async () => {
          return (await this.find.find_with_filter())
            .map(({ _id, ...rest }) => Object.values(rest).join(" | "))
            .join("\n");
        },
        "fetch all": this.find.fetch_all_for_print.bind(this.find),
      },
      create: {
        "create one": this.create.create_one.bind(this.create),
        "create many": this.create.create_many.bind(this.create),
      },
      update: {
        "update one": this.update.update_one.bind(this.update),
        "update many": this.update.update_many.bind(this.update),
      },
      delete: {
        "delete one": this.delete.delete_one.bind(this.delete),
        "delete many": this.delete.delete_many.bind(this.delete),
        "delete all": this.delete.delete_all.bind(this.delete),
      },
    };

    while (typeof value === "object") {
      selected_value = await this.global.inquirer.select(
        "Please select a function",
        Object.keys(value)
      );

      value = await value[selected_value];
    }

    return value();
  }
}
