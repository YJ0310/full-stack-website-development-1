import process from "node:process";

export class chapter3_5 {
  /**
   * @constructor
   * @property {Number} port
   * @property {String} dbUrl
   */
  constructor() {
    /**@type {Number} */
    this.port = process.env.PORT || 3000;
    /**@type {String} */
    this.dbUrl = process.env.DATABASE_URL || "mongodb://localhost:27017/myapp";
  }
  async process_object() {
    console.log(process.argv); // command line arguments
    console.log(process.env.NODE_ENV); // environment variables
    console.log(process.cwd()); // current working directory
    console.log(process.pid); // process id
    process.exit(0); // exit the process
  }
  async environment_variable() {
    // set environment variables
    process.env.NODE_ENV = `development`;
    process.env.port = `3000`;

    // using dotenv package for .env files
    require(`dotenv`).config();
  }
}

new chapter3_5().environment_variable();
new chapter3_5().process_object();  
