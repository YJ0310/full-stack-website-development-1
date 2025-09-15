import { dirname, join } from "path";
import global from "../_manager.js";
import fs from "fs/promises";
import { pathToFileURL } from "url";

export class Example_data {
  constructor() {
    /**
     * @type {example_data[]}
     */
    this.converted_data = [];
  }
  /**
   * @typedef {object} example_data
   * @property {string} Name
   * @property {number} Birth
   * @property {number} Age
   * @property {string} Place
   * @property {string} University
   * @property {string} Pre_University
   * @property {string} Tel_Number
   * @property {boolean} Single
   * @property {string} _id
   *
   */

  async get_example_data() {
    /**@type {example_data[]} */
    let converted_data = [];

    let raw_data = await (
      await fs.readFile(join(import.meta.dirname, "example_data.csv"))
    ).toString();

    let key = raw_data.split("\r\n").at(0).split(",");

    raw_data = raw_data
      .split("\r\n")
      .slice(1)
      .map((i) => i.split(","));

    for (const element of raw_data) {
      let data = {};

      for (let index = 0; index < key.length; index++) {
        data[key[index]] = element[index];
      }
      converted_data.push(data);
    }

    this.converted_data = converted_data;

    return this;
  }

  /**
   *
   * @param {example_data[]} converted_data
   * @returns
   */
  auto_fill_tel_number() {
    let converted_data;

    converted_data = this.converted_data.map((data) => {
      if (data.Tel_Number === "no number") {
        data.Tel_Number = [
          "01",
          global.common.random.random(1, 9),
          "-",
          global.common.random.random(1111000, 99999999),
        ].join("");
      }
      return data;
    });

    return this;
  }

  /**
   *
   * @param {example_data[]} converted_data
   * @returns
   */
  add_id() {
    this.converted_data = this.converted_data.map((data, index) => {
      return { Id: `#${index.toString().padStart(3, "0")}`, ...data };
    });
    return this;
  }
}

export const New_Example_Data = {
  init_person: async () => {
    /**
     * @type {example_data[]}
     */
    let data_set;

    data_set = import.meta.dirname;

    data_set = join(data_set, "example_data(new).csv");

    data_set = (await fs.readFile(data_set))
      .toString()
      .split("\r\n")
      .map((i) => i.split(","));

    let keys = data_set.at(0);

    data_set = data_set.slice(1);

    for (let index = 0; index < data_set.length; index++) {
      const element = data_set[0];

      let data = {};

      for (let i = 0; i < keys.length; i++) {
        if (["Birth", "Age"].includes(keys[i])) {
          data[keys[i]] = parseInt(element[i]);
        } else if (["Single"].includes(keys[i])) {
          data[keys[i]] = Boolean(element[i]);
        } else {
          data[keys[i]] = element[i];
        }
      }

      data_set = data_set.slice(1);
      data_set.push(data);
    }

    data_set = data_set.sort((a, b) => a.Name.localeCompare(b.Name));

    data_set = data_set.map((v, i) => {
      v._id = `P${(i + 1).toString().padStart(3, "0")}`;
      return v;
    });

    return data_set;
  },

  init_university: async () => {
    let data_set = (
      await fs.readFile(
        join(import.meta.dirname, "example_data_university.csv")
      )
    )
      .toString()
      .split("\r\n")
      .map((i) => i.split("\t"));

    let keys = data_set.splice(0, 1).at(0);


    for (let index = 0; index < data_set.length; index++) {
      let data = {};

      for (let i = 0; i < keys.length; i++) {
        if (["Public University", "Research University"].includes(keys[i])) {
          data[keys[i]] = Boolean(data_set[0][i]);
        } else {
          data[keys[i]] = data_set[0][i];
        }
      }

      data_set = data_set.slice(1);

      data_set.push(data);
    }

    return data_set;
  },

  init_pre_u: async () => {
    let data_set = (
      await fs.readFile(
        join(import.meta.dirname, "example_data_pre_university.csv")
      )
    )
      .toString()
      .split("\r\n")
      .map((i) => i.split("\t"));

    let keys = data_set.at(0);

    data_set = data_set.slice(1);

    for (let index = 0; index < data_set.length; index++) {
      let data = {};
      for (let i = 0; i < keys.length; i++) {
        if (["Public Institution"].includes(keys[i])) {
          data[keys[i]] = Boolean(data_set[0][i]);
        } else {
          data[keys[i]] = data_set[0][i];
        }
      }

      data_set = data_set.slice(1);

      data_set.push(data);
    }
    return data_set;
  },
};
